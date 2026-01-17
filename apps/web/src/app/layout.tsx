import type { Metadata } from 'next';
import { Inter, Playfair_Display, Lato } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/navbar';
import { WalletProvider } from "@/components/wallet-provider"
import { DevDebug } from "@/components/dev-debug";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export const metadata: Metadata = {
  title: 'latin-realstate',
  description: 'a platform for showcasing realstate assets',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${lato.variable} font-sans`}>
        {/* Navbar is included on all pages */}
        <div className="relative flex min-h-screen flex-col">
          <WalletProvider>
            <Navbar />
            <DevDebug />
            <main className="flex-1">
              {children}
            </main>
          </WalletProvider>
        </div>
      </body>
    </html>
  );
}
