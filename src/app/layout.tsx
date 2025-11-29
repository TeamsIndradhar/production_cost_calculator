import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cost Calculator Pro | Indradhar Consultancy",
  description: "Professional cost-per-piece calculator for manufacturers. Calculate production costs, selling prices, and profit margins in real-time.",
  keywords: ["cost calculator", "manufacturing", "MSME", "costing", "profit margin", "selling price", "Indradhar Consultancy"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}
