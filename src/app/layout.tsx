import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "National Innovation Portal | Jharkhand Innovation Network",
  description: "Report and resolve societal challenges in Jharkhand through collaborative innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} min-h-screen bg-[#FAF8F3] text-slate-900 flex flex-col antialiased selection:bg-[#D9531E] selection:text-white`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
