'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store'; // Adjust the path if needed
import { WeatherResponse } from '@/types'; // Adjust the path if needed
import { fetchWeatherByCoords } from '@/redux/slices/weatherSlice';
import WeatherCard from './WeatherCard'; // Adjust the path if needed

const WeatherCardSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const data = useSelector((state: RootState) => state.weather.data);
  const [units, setUnits] = useState<'metric' | 'imperial' | 'standard' | undefined>(undefined);

  const weatherResponse = data as WeatherResponse;

  useEffect(
    () => {
      if (currentLocation) {
        dispatch(fetchWeatherByCoords({
          lat: currentLocation.lat,
          lon: currentLocation.lon,
          units,
        }));
      }
    },
    [currentLocation, units, dispatch], // Added dispatch to the dependency array
  );

  return (
    <div className='relative'>
      <div className='mb-4'>
        <label htmlFor='unit-select' className='block text-sm font-medium text-gray-700 dark:text-white'>
          Select Unit:
          <select
            id='unit-select'
            name='unit'
            className='mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            value={units}
            onChange={(e) => setUnits(e.target.value as 'metric' | 'imperial' | 'standard')}
          >
            <option value='standard'>Standard</option>
            <option value='metric'>Metric</option>
            <option value='imperial'>Imperial</option>
          </select>
        </label>
      </div>
      <WeatherCard weatherResponse={weatherResponse} units={units} />
    </div>
  );
};

export default WeatherCardSection;
