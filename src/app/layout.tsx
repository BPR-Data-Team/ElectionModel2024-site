import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "24cast.org by BPR",
  description:
    "Innovative election predictions with in-depth explanations by the Brown Political Review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dze2nzm.css" />
      </head>
      <body className={inter.className}>
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
