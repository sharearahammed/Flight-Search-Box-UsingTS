import { configureStore } from '@reduxjs/toolkit';
import flightSearchReducer from '../src/pages/HomeSearchBox/FlightSearch/flightSearchSlice';

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
