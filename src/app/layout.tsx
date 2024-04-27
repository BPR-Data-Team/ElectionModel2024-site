import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | 24cast',
    default: '24cast by BPR',
  },
  description: "Innovative election predictions with in-depth explanations by the Brown Political Review.",
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
      </body>
    </html>
  );
}
