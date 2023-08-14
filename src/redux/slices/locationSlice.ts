/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Location, LocationsResponse } from '@/types';

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/geo/1.0/direct`;

type LocationState = {
  data: LocationsResponse | null;
  currentLocation: Location | null;
  isLoading: boolean;
  error: string;
};

const initialState: LocationState = {
  data: null,
  currentLocation: null,
  isLoading: false,
  error: '',
};

export const fetchLocationByName = createAsyncThunk(
  'location/fetchLocationByName',
  async (params: { name: string }) => {
    const { name } = params;
    const url = `${API_ENDPOINT}?q=${name}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = (await response.json()) as LocationsResponse;
    return data;
  },
);

export const updateCurrentLocation = (state: LocationState, action: PayloadAction<Location>) => {
  state.currentLocation = action.payload;
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: updateCurrentLocation,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationByName.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchLocationByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLocationByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? '';
      });
  },
});

export const { setCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;
