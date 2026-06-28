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
  title: "Wally Nassif Electrical Contracting | Celebrating 50 Years • 1976–2026",
  description:
    "For five decades, Wally Nassif has delivered expert electrical solutions to homeowners, businesses, and industry. Celebrating 50 years of trust, craftsmanship, and quality workmanship — 1976 to 2026.",
  keywords: [
    "electrical contractor",
    "master electrician",
    "50 years",
    "generator systems",
    "EV charging",
    "commercial electrical",
    "residential electrical",
    "Wally Nassif",
  ],
  openGraph: {
    title: "Wally Nassif Electrical Contracting — 50 Years of Excellence",
    description:
      "Building Trust. Powering Communities. Creating Lasting Relationships. Celebrating 50 years, 1976–2026.",
    type: "website",
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
