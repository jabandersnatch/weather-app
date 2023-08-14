import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HeaderNav from '@/components/HeaderNav';
import Providers from '@/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solvedex Weather App',
  description: 'A weather app built with Next.js and Tailwind CSS.',
};

const RootLayout = ({
  children,
} : {
  children: React.ReactNode;
}) => (
  <html lang='en' suppressHydrationWarning>
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={(metadata.description as string)} />
      <meta name='theme-color' content='#000000' />
      <title>{(metadata.title as string)}</title>
    </head>
    <body className={inter.className}>
      <Providers>
        <main className='w-full p-8 bg-gray-300 text-black dark:bg-gray-800 dark:text-white'>
          <HeaderNav />
          {children}
        </main>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
