import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
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
          <Image src='/Waves.svg' alt='Waves 1' className='absolute inset-x-0 top-[90%] h-24 sm:top-[85%] md:top-[80%] lg:top-[75%] xl:top-[70%] 2xl:top-[65%] rotate-[180deg] z-0 pointer-events-none' layout='fill' objectFit='cover' />
          <Image src='/Waves.svg' alt='Waves 2' className='absolute inset-x-0 top-[90%] h-24 sm:top-[85%] md:top-[80%] lg:top-[75%] xl:top-[70%] 2xl:top-[65%] z-0 pointer-events-none' layout='fill' objectFit='cover' />
          <div className='absolute inset-0 z-0 pointer-events-none'>
            <div className='absolute w-32 h-48 bg-gray-500 dark:bg-blue-900 rounded-full blur-3xl top-[-10%] left-[20%] sm:left-[10%] sm:top-[5%] lg:left-[5%] lg:top-[10%] xl:left-[10%] xl:top-[5%]' />
            <div className='absolute w-32 h-56 bg-gray-500 dark:bg-blue-900 rounded-full blur-3xl top-[10%] right-[-5%] sm:right-[10%] sm:top-[5%] lg:right-[5%] lg:top-[10%] xl:right-[10%] xl:top-[5%]' />
            <div className='absolute w-32 h-56 bg-gray-500 dark:bg-blue-900 rounded-full blur-3xl bottom-[-10%] right-[10%] sm:right-[5%] sm:bottom-[5%] lg:right-[10%] lg:bottom-[10%] xl:right-[5%] xl:bottom-[5%]' />
            <div className='absolute w-32 h-56 bg-gray-500 dark:bg-blue-900 rounded-full blur-3xl bottom-[10%] left-[-5%] sm:left-[10%] sm:bottom-[5%] lg:left-[5%] lg:bottom-[10%] xl:left-[10%] xl:bottom-[5%]' />
          </div>
          <HeaderNav />
          {children}
        </main>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
