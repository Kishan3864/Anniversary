// Tiny, dependency-free control service for the maintenance lock.
//
// It stores a single { locked: boolean } flag on disk and checks the admin
// password SERVER-SIDE, so the password is never shipped in the static site.
// nginx reverse-proxies /admin-api/  ->  http://127.0.0.1:8787/
//
// Run it via systemd (see server/DEPLOY-ADMIN.md). Configure with env vars:
//   ADMIN_PASSWORD  (required) the password the /admin page must send
//   ADMIN_PORT      (optional) default 8787, bound to 127.0.0.1 only
//   ADMIN_STATE     (optional) path to the JSON flag file

import http from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.ADMIN_PORT) || 8787;
const PASSWORD = process.env.ADMIN_PASSWORD || "";
const STATE_FILE =
  process.env.ADMIN_STATE || fileURLToPath(new URL("./state.json", import.meta.url));

async function getState() {
  try {
    return JSON.parse(await readFile(STATE_FILE, "utf8"));
  } catch {
    return { locked: false };
  }
}

async function setLocked(locked) {
  await writeFile(STATE_FILE, JSON.stringify({ locked: !!locked }), "utf8");
}

function send(res, code, obj) {
  res.writeHead(code, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 10_000) req.destroy(); // guard against huge bodies
    });
    req.on("end", () => resolve(data));
    req.on("error", () => resolve(""));
  });
}

const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, "http://localhost").pathname.replace(/\/+$/, "") || "/";

  // public: current lock status (every visitor's page calls this)
  if (req.method === "GET" && (path === "/status" || path === "/")) {
    return send(res, 200, { locked: (await getState()).locked === true });
  }

  // admin: verify password + return current state
  if (req.method === "POST" && path === "/login") {
    let body = {};
    try { body = JSON.parse((await readBody(req)) || "{}"); } catch {}
    if (!PASSWORD || body.password !== PASSWORD) {
      return send(res, 401, { ok: false, error: "Invalid password" });
    }
    return send(res, 200, { ok: true, locked: (await getState()).locked === true });
  }

  // admin: set the lock (requires password every time)
  if (req.method === "POST" && path === "/toggle") {
    let body = {};
    try { body = JSON.parse((await readBody(req)) || "{}"); } catch {}
    if (!PASSWORD || body.password !== PASSWORD) {
      return send(res, 401, { ok: false, error: "Invalid password" });
    }
    await setLocked(body.locked);
    return send(res, 200, { ok: true, locked: !!body.locked });
  }

  send(res, 404, { error: "Not found" });
});

server.listen(PORT, "127.0.0.1", () => {
  // eslint-disable-next-line no-console
  console.log(`[admin] control service listening on 127.0.0.1:${PORT}`);
  if (!PASSWORD) {
    // eslint-disable-next-line no-console
    console.warn("[admin] WARNING: ADMIN_PASSWORD is empty — refusing all toggles.");
  }
});
