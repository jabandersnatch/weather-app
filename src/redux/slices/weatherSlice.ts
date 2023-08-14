/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherResponse } from '@/types';

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/data/2.5/weather`;

type WeatherState = {
  data: WeatherResponse | null;
  isLoading: boolean;
  error: string;
};

const initialState: WeatherState = {
  data: {
    coord: {
      lon: -74.0836,
      lat: 4.653,
    },
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d',
      },
    ],
    base: 'stations',
    main: {
      temp: 16.99,
      feels_like: 16.08,
      temp_min: 16.99,
      temp_max: 16.99,
      pressure: 1029,
      humidity: 51,
    },
    visibility: 10000,
    wind: {
      speed: 4.12,
      deg: 140,
    },
    clouds: {
      all: 75,
    },
    dt: 1692025416,
    sys: {
      type: 1,
      id: 8582,
      country: 'CO',
      sunrise: 1692010376,
      sunset: 1692054564,
    },
    timezone: -18000,
    id: 3678413,
    name: 'La Merced',
    cod: 200,
  },
  isLoading: false,
  error: '',
};

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchWeatherByCoords',
  async ({ lat, lon, units = 'standard' }: { lat: number; lon: number; units?: 'metric' | 'imperial' | 'standard' }) => {
    if (lat === 0 || lon === 0) {
      throw new Error('Invalid coordinates: Latitude and Longitude cannot be 0.');
    }

    const url = `${API_ENDPOINT}?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = (await response.json()) as WeatherResponse;
    return data;
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? '';
      });
  },
});

export default weatherSlice.reducer;
