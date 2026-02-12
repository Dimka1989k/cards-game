import type { Metadata } from "next";
import { MedievalSharp, Rubik } from "next/font/google";
import "./globals.css";


const rubik = Rubik({ 
  subsets: ["latin"],
  variable: "--font-rubik",
});

const medievalSharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-medieval",
});

export const metadata: Metadata = {
  title: "Dragon Cards Game",
  description: "Play Cards Dragon",
};

export default function RootLayout({
   children,
  }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${medievalSharp.variable} ${rubik.variable}`}
      >
      {children}
      </body>
    </html>
  );
}