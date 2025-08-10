import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightSearchState {}

const initialState: FlightSearchState = {};

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {},
});

export const {} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
