/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherResponse } from '@/types';

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/data/2.5/weather`;
const { API_KEY } = process.env;

type WeatherState = {
  data: WeatherResponse | null;
  isLoading: boolean;
  error: string;
};

const initialState: WeatherState = {
  data: null,
  isLoading: false,
  error: '',
};

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchWeatherByCoords',
  async (params: { lat: number; lon: number }) => {
    const { lat, lon } = params;
    const url = `${API_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
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
