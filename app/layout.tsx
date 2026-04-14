import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vetted",
  description:
    "Ontario's curated registry. Built for professionals who deserve to be found.",
};

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.className} ${cormorant.variable} h-full overflow-x-hidden antialiased`}
    >
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
