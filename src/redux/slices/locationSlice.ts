/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LocationsResponse } from '@/types';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/geo/1.0/direct`;
const { API_KEY } = process.env;

type LocationState = {
  data: LocationsResponse | null;
  isLoading: boolean;
  error: string;
};

const initialState: LocationState = {
  data: null,
  isLoading: false,
  error: '',
};

export const fetchLocationByName = createAsyncThunk(
  'location/fetchLocationByName',
  async (params: { name: string }) => {
    const { name } = params;
    const url = `${API_ENDPOINT}?q=${name}&limit=5&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = (await response.json()) as LocationsResponse;
    return data;
  },
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
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

export default locationSlice.reducer;
