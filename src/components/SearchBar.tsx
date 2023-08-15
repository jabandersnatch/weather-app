/* eslint-disable  @typescript-eslint/no-explicit-any */

'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '@/redux/store';
import { fetchLocationByName, setCurrentLocation } from '@/redux/slices/locationSlice';
import { LocationsResponse, Location } from '@/types';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<LocationsResponse>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { data } = useSelector((state: any) => state.location || []);

  const locations = data as LocationsResponse;

  useEffect(() => {
    if (searchValue.length > 0) {
      setShowSearchResult(true);
    } else {
      setShowSearchResult(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setSearchResult(locations);
    }
  }, [locations, searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    if (inputValue.length > 3) {
      dispatch(fetchLocationByName({ name: inputValue }));
    }
  };

  const handleSelectLocation = (location: Location) => {
    setSearchValue(location.name);
    setShowSearchResult(false);
    dispatch(setCurrentLocation(location));
  };

  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='Search location'
        value={searchValue}
        onChange={handleSearch}
        className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none'
        data-cy='search-input'
      />
      <div className='absolute top-0 right-0 flex items-center justify-center w-10 h-full text-gray-400'>
        <MagnifyingGlassIcon className='w-5 h-5' />
      </div>
      {showSearchResult && (
      <div className='absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg top-12' data-cy='search-result'>
        {searchResult.map((location: Location, index: number) => (
          <div
            key={`${location.name}-${location.country}-${`${location.lat}-${location.lon}`}`}
            role='button'
            tabIndex={0}
            className='px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white dark:bg-gray-700'
            onClick={() => handleSelectLocation(location)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSelectLocation(location);
              }
            }}
            data-cy={`search-result-${index}`}
          >
            {location.name}
            {' '}
            (
            {location.country}
            )
            {' '}
            lat:
            {location.lat}
            {' '}
            lon:
            {location.lon}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchBar;
