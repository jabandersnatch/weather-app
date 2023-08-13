'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ToggleDarkMode from './ToggleDarkMode';

const HeaderNav = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    if (pathname === '/') {
      setActiveLink('home');
    } else {
      setActiveLink(pathname.replace('/', ''));
    }
  }, [pathname]);

  return (
    <nav className='flex items-center justify-between flex-wrap bg-gray-300 dark:bg-gray-800 dark:text-white text-black p-6'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <Link
          href='/'
          className={`font-semibold text-xl tracking-tight ${activeLink === 'home' && 'font-bold'} hover:text-blue-600 mr-4`}
          onClick={() => setActiveLink('home')}
        >
          <span className='font-bold'>
            Solvedex
            {' '}
            <span className='text-blue-600'>Weather</span>
          </span>
        </Link>
      </div>

      <div className='text-sm lg:flex-grow lg:text-center hidden lg:block'>
        <Link
          href='/'
          className={`dark:text-gray-300 text-black ${activeLink === 'home' && 'font-bold'} hover:text-blue-600 mr-4`}
          onClick={() => setActiveLink('home')}
        >
          Home
        </Link>
        <Link
          href='/weather-across-the-world'
          className={`dark:text-gray-300 text-black${activeLink === 'weather-across-the-world' && 'font-bold'} hover:text-blue-600 mr-4`}
          onClick={() => setActiveLink('weather-across-the-world')}
        >
          Weather Across the World
        </Link>
      </div>

      <div className='flex items-center'>
        <ToggleDarkMode />
      </div>
    </nav>
  );
};

export default HeaderNav;
