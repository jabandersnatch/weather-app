import React from 'react';
import SearchBar from '@/components/SearchBar';

const Home = () => (
  <div className='flex flex-col items-center justify-center min-h-screen p-8 space-y-12 text-black dark:text-white'>
    <h1 className='text-5xl font-extrabold tracking-tight text-center sm:text-6xl dark:text-white hover:text-cyan-700 transition-colors'>
      Solvedex Weather App
    </h1>
    <SearchBar />
    <h2 className='text-xl font-semibold text-center sm:text-2xl dark:text-white hover:text-cyan-500 transition-colors'>
      Search your location and get the weather forecast
    </h2>
  </div>
);

export default Home;
