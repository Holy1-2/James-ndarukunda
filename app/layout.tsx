import type { Metadata } from "next";
import { Bebas_Neue, Dancing_Script, Manrope } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const signature = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-signature",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "James Ndarukunda",
  description: "Official website of recording artist James Ndarukunda.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${signature.variable} ${body.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
