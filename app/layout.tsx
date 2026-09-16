import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CartHydration from "@/providers/CartHydration";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fashion E-commerce Website",
  description:
    "Fashion E-commerce Website built with Next.js 13, Tailwind CSS, and TypeScript",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
        <CartHydration />
      </body>
    </html>
  );
}
