'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const ToggleDarkMode = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleDarkMode = () => {
    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className='flex flex-row justify-between toggle'>
      <label htmlFor='dark-toggle' className='flex items-center cursor-pointer'>
        <div className='relative'>
          <input
            type='checkbox'
            name='dark-mode'
            id='dark-toggle'
            className='checkbox hidden'
            checked={currentTheme === 'dark'}
            onChange={toggleDarkMode}
          />
          <div className='block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full' />
          <div
            className={`dot absolute ${currentTheme === 'dark' ? 'left-7' : 'left-1'} top-1 dark:bg-white bg-gray-500 w-6 h-6 rounded-full transition-transform duration-300`}
          >
            {currentTheme === 'dark' ? <SunIcon className='w-6 h-6 text-black' /> : <MoonIcon className='w-6 h-6 text-white' />}
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleDarkMode;
