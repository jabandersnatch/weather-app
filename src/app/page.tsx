import React from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCardSection from '@/components/WeatherCardSection';

const Home = () => (
  <div className='flex flex-col items-center justify-center min-h-screen p-8 space-y-12 text-black dark:text-white z-10'>
    <h1 className='text-5xl font-extrabold tracking-tight text-center sm:text-6xl dark:text-white hover:text-cyan-700 transition-colors'>
      Solvedex Weather App
    </h1>
    <SearchBar />
    <WeatherCardSection />
  </div>
);

export default Home;
