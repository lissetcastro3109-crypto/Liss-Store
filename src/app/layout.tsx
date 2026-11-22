
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Liss Store | Tecnología",
  description: "Descubre productos tecnológicos en Liss Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Navbar />

        <main className="min-h-[70vh]">
          {children}
        </main>

      </body>
    </html>
  );
}
