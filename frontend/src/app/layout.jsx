"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Bell, House, ShoppingCart, User } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto px-16 lg:px-0`}
        >
          <nav className="flex justify-between items-center py-4 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <Link href="/" className="text-2xl font-black">
                Lama Shop
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <House className="w-5 h-5 cursor-pointer" />
              <Bell className="w-5 h-5 cursor-pointer" />
              <ShoppingCart className="w-5 h-5 cursor-pointer" />

              {/* Avatar replaced with icon */}
              <User className="w-8 h-8 p-1 rounded-full border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-100 transition" />
            </div>
          </nav>

          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}