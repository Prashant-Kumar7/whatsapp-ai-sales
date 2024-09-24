import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A modern Next.js application with improved layout",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Providers>
        <body className="antialiased min-h-screen flex flex-col">
          <header className="bg-gray-100 "></header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-100 mt-auto"></footer>
        </body>
      </Providers>
    </html>
  );
}
