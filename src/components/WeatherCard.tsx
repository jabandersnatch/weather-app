import React from 'react';
import Image from 'next/image';
import { WeatherResponse } from '@/types';

interface WeatherCardProps {
  weatherResponse: WeatherResponse;
  units: 'metric' | 'imperial' | 'standard' | undefined;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherResponse, units }) => {
  const {
    weather, main, wind, name, dt, timezone,
  } = weatherResponse;

  const date = new Date(dt * 1000);

  const timeZoneString = `Etc/GMT${timezone > 0 ? '-' : '+'}${Math.abs(timezone / 3600)}`;
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timeZoneString,
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const handleImage = ({ icon }: { icon: string }) => {
    switch (icon) {
      case '01d':
        return { src: '/WeatherIcons/Sunny.png', alt: 'clear-day' };
      case '01n':
        return { src: '/WeatherIcons/Clear Night.png', alt: 'clear-night' };
      case '02d':
        return { src: '/WeatherIcons/Sunny with cloud.png', alt: 'partly-cloudy-day' };
      case '02n':
        return { src: '/WeatherIcons/Cloudny Night.png', alt: 'partly-cloudy-night' };
      case '03d':
        return { src: '/WeatherIcons/Cloudy.png', alt: 'cloudy' };
      case '03n':
        return { src: '/WeatherIcons/Cloudy.png', alt: 'cloudy' };
      case '04d':
        return { src: '/WeatherIcons/Sunny with broken cloud.png', alt: 'broken-clouds' };
      case '04n':
        return { src: '/WeatherIcons/Cloudy Night Broken Cloud.png', alt: 'broken-clouds' };
      case '09d':
        return { src: '/WeatherIcons/Storm.png', alt: 'shower-rain' };
      case '09n':
        return { src: '/WeatherIcons/Storm.png', alt: 'shower-rain' };
      case '10d':
        return { src: '/WeatherIcons/Sunny Rain.png', alt: 'rain' };
      case '10n':
        return { src: '/WeatherIcons/Sunny Rain.png', alt: 'rain' };
      case '11d':
        return { src: '/WeatherIcons/Thunder.png', alt: 'thunderstorm' };
      case '11n':
        return { src: '/WeatherIcons/Thunder.png', alt: 'thunderstorm' };
      case '13d':
        return { src: '/WeatherIcons/Snowy.png', alt: 'snow' };
      case '13n':
        return { src: '/WeatherIcons/Snowy.png', alt: 'snow' };
      case '50d':
        return { src: '/WeatherIcons/Wind.png', alt: 'mist' };
      case '50n':
        return { src: '/WeatherIcons/Wind.png', alt: 'mist' };
      default:
        return { src: '/WeatherIcons/Sunny.png', alt: 'clear-day' };
    }
  };
  return (
    <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg'>
      <div className='flex justify-center items-center'>
        <Image
          src={handleImage(weather[0]).src}
          alt={handleImage(weather[0]).alt}
          width={100}
          height={100}
        />
      </div>
      <div className='flex justify-between items-center mt-4'>
        <h2 className='text-xl font-bold'>
          {name}
          :
          {' '}
        </h2>
        <span className='text-xl'>
          {main.temp}
          °
          {units === 'metric' ? 'C' : 'F'}

        </span>
      </div>
      <p className='mt-2'>
        Wind Speed:
        {wind.speed}
        {' '}
        {units === 'metric' ? 'm/s' : 'mph'}
      </p>
      <p className='mt-2'>{formattedDate}</p>
      <p className='mt-2 text-lg'>{weather[0].main}</p>
    </div>
  );
};

export default WeatherCard;
