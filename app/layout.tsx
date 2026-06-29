import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Wally Nassif Electrical Contracting Service | Celebrating 50 Years · 1976–2026",
  description:
    "Powering South Florida with reliability and expertise since 1976. Wally Nassif Electrical Contracting Service — licensed, insured & bonded electrical contractor (EC13001410) for residential, commercial & industrial. Generators, EV charging, panel upgrades & 24/7 emergency service. Call (561) 582-2600.",
  keywords: [
    "Wally Nassif Electrical",
    "Nassif Electric",
    "electrician West Palm Beach",
    "South Florida electrical contractor",
    "generator installation",
    "EV charger installation",
    "panel upgrades",
    "commercial electrical",
    "industrial electrical",
    "EC13001410",
  ],
  openGraph: {
    title:
      "Wally Nassif Electrical Contracting Service — Celebrating 50 Years (1976–2026)",
    description:
      "The Trusted Electrician for South Florida since 1976. Reliable • Licensed • Experienced. Call (561) 582-2600.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
