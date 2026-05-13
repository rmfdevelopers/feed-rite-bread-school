import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const headingFont = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900'] 
});

const bodyFont = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '600', '800'] 
});

export const metadata = {
  title: 'FEED RITE Bread School | Mastering Commercial Baking',
  description: 'The premier destination in Lagos for professional commercial bread training and expert consultancy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased selection:bg-accent selection:text-primary`}>
        {children}
      </body>
    </html>
  );
}