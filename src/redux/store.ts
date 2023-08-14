import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import WeatherReducer from './slices/weatherSlice';
import LocationReducer from './slices/locationSlice';

export const store = configureStore({
  reducer: {
    weather: WeatherReducer,
    location: LocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
