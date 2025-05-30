import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CryptoTicker from "./components/crypto-ticker";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CryptoFix | Recover & Secure Your Crypto Wallet",
  description: "CryptoFix is your trusted solution for fixing, recovering, and securing cryptocurrency wallets. Fast, secure, and blockchain expert-backed support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CryptoTicker/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
