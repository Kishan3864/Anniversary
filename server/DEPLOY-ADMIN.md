# Maintenance lock — server setup

The site is a static export, so the lock state lives in a tiny Node control
service (`admin-server.mjs`) that nginx proxies at `/admin-api/`. The `/admin`
page toggles it; every visitor's page reads it and shows "Under Maintenance"
when locked. The admin password is checked **server-side** (env var), so it is
never in the static site.

Assumes the repo is cloned at `~/Anniversary` and the webroot is
`/var/www/anniversary.flexypdf.com`. Adjust paths if different.

## 1. Create the systemd service

Find your node path first: `which node` (e.g. `/usr/bin/node`).

```bash
sudo tee /etc/systemd/system/anniversary-admin.service >/dev/null <<'UNIT'
[Unit]
Description=Anniversary maintenance-lock control service
After=network.target

[Service]
Type=simple
User=flexyuser
WorkingDirectory=/home/flexyuser/Anniversary/server
Environment=ADMIN_PORT=8787
Environment=ADMIN_PASSWORD=CHANGE_THIS_PASSWORD
Environment=ADMIN_STATE=/home/flexyuser/Anniversary/server/state.json
ExecStart=/usr/bin/node /home/flexyuser/Anniversary/server/admin-server.mjs
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
UNIT

# set your real password, then start it
sudo systemctl daemon-reload
sudo systemctl enable --now anniversary-admin
sudo systemctl status anniversary-admin --no-pager
```

Change `ADMIN_PASSWORD=CHANGE_THIS_PASSWORD` to your real password, and fix the
node path if `which node` reported something other than `/usr/bin/node`.

## 2. Proxy /admin-api/ in nginx

Inside the existing `server { … }` block for `anniversary.flexypdf.com`
(the HTTPS one), add:

```nginx
location /admin-api/ {
    proxy_pass http://127.0.0.1:8787/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}
```

Then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 3. Test

```bash
curl https://anniversary.flexypdf.com/admin-api/status   # -> {"locked":false}
```

Open `https://anniversary.flexypdf.com/admin`, enter the password, flip the
switch. The public site should immediately show "Under Maintenance" on reload.

## Notes
- Fails **open**: if this service is down, the site stays visible.
- `/admin` is never locked, so you can always get back in to unlock.
- To change the password later: edit the service file's `ADMIN_PASSWORD`, then
  `sudo systemctl daemon-reload && sudo systemctl restart anniversary-admin`.
