import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import TopicsHeader from "@/components/topicsHeader";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "collabnode",
  description: "Discussion platform",
  icons: {
    icon: '/assets/Discuss3.jpg', // or .png/.svg
  },
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
        <div className="container mx-auto max-w-6xl">
          
          <SessionProvider>
            
            <Header />
            <TopicsHeader />
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
