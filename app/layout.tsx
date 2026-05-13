import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const headingFont = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["700", "800"] 
});

const bodyFont = Sora({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "600"] 
});

export const metadata: Metadata = {
  title: "FEED RITE Bread School | Master Commercial Baking in Lagos",
  description: "The definitive Lagos institution for professional bread making and bakery business consultancy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}