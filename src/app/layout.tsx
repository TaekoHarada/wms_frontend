"use client";
import type { ReactNode } from "react";
import "../styles/globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="h-screen bg-gray-50 text-gray-800">
        {/* Header - Fixed at the top */}
        <Header />

        {/* Main Layout: Sidebar (Left) + Content (Right) */}
        <div className="flex h-screen pt-16">
          {/* Sidebar - Fixed on the left */}
          <div className="w-64 fixed top-16 left-0 h-full bg-white shadow-md">
            <Sidebar />
          </div>

          {/* Main Content - Takes remaining space */}
          <main className="ml-64 flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
