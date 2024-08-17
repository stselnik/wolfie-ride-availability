import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import "./ui/globals.css";
import Navbar from "./ui/navbar";

const notosans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wolfie Ride Availability",
  description: "Find the bikes available near you at Stony Brook University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notosans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
