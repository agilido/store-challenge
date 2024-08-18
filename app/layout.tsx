import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartContextProvider } from "@/context/cartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store Front",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex-row min-h-screen md:py-8 md:p-16 p-8">
          <CartContextProvider>
            <Navbar />
            {children}
          </CartContextProvider>
        </main>
      </body>
    </html>
  );
}
