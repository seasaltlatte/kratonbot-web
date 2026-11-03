import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Noto_Sans_Javanese, Pinyon_Script, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], weight: ["400", "500", "600"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const pinyon = Pinyon_Script({ variable: "--font-pinyon", subsets: ["latin"], weight: "400" });
const jawa = Noto_Sans_Javanese({ variable: "--font-jawa", subsets: ["javanese"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "KratonBot: tanya sejarah Keraton Surakarta & Mangkunegaran",
  description:
    "Chatbot AI tentang Keraton Kasunanan Surakarta dan Pura Mangkunegaran yang selalu menunjukkan sumber dan membedakan fakta, tafsir, dan legenda.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${bodoni.variable} ${cormorant.variable} ${pinyon.variable} ${jawa.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
