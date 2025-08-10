import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, addDays } from "date-fns";

interface Segment {
  id: number;
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  address: string;
}

type type = "oneway" | "return" | "multicity";

interface FlightSearchState {
  adultCount: number;
  childCount: number[];
  infantCount: number;
  value: type;
  fromSegmentLists: Segment[];
  toSegmentLists: Segment[];
  departureDates: string[];
  arrivalDates: string[];
  segmentCount: number;
}

const now = new Date();
const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

const initialFromDates = [...new Array(5)].map((_, index) =>
  formatDate(addDays(now, index * 3 + 1))
);
const initialToDates = [...new Array(5)].map((_, index) =>
  formatDate(addDays(now, index * 3 + 3))
);

const initialState: FlightSearchState = {
  adultCount: 1,
  childCount: [],
  infantCount: 0,
  value: "oneway",
  fromSegmentLists: [
    {
      id: 802,
      code: "DAC",
      name: "Hazrat Shahjalal Intl Airport",
      cityCode: "DAC",
      cityName: "Dhaka",
      countryName: "BANGLADESH",
      countryCode: "BD",
      address: "Dhaka",
    },
    {
      id: 4402,
      code: "CXB",
      name: "Cox's Bazar Airport",
      cityCode: "CXB",
      cityName: "Cox's Bazar",
      countryName: "BANGLADESH",
      countryCode: "BD",
      address: "Cox's Bazar",
    },
    {
      id: 5,
      code: "JFK",
      name: "John F Kennedy Intl ",
      cityCode: "NYC",
      cityName: "New York",
      countryName: "UNITED STATES",
      countryCode: "US",
      address: "New York",
    },
    {
      id: 932,
      code: "DXB",
      name: "Dubai Intl Airport",
      cityCode: "DXB",
      cityName: "Dubai",
      countryName: "UNITED ARAB EMIRATES",
      countryCode: "AE",
      address: "Dubai",
    },
    {
      id: 1633,
      code: "JED",
      name: "King Abdulaziz International Airport",
      cityCode: "JED",
      cityName: "Jeddah",
      countryName: "SAUDI ARABIA",
      countryCode: "SA",
      address: "Jeddah",
    },
  ],
  toSegmentLists: [
    {
      id: 4402,
      code: "CXB",
      name: "Cox's Bazar Airport",
      cityCode: "CXB",
      cityName: "Cox's Bazar",
      countryName: "BANGLADESH",
      countryCode: "BD",
      address: "Cox's Bazar",
    },
    {
      id: 5,
      code: "JFK",
      name: "John F Kennedy Intl ",
      cityCode: "NYC",
      cityName: "New York",
      countryName: "UNITED STATES",
      countryCode: "US",
      address: "New York",
    },
    {
      id: 932,
      code: "DXB",
      name: "Dubai Intl Airport",
      cityCode: "DXB",
      cityName: "Dubai",
      countryName: "UNITED ARAB EMIRATES",
      countryCode: "AE",
      address: "Dubai",
    },
    {
      id: 1633,
      code: "JED",
      name: "King Abdulaziz International Airport",
      cityCode: "JED",
      cityName: "Jeddah",
      countryName: "SAUDI ARABIA",
      countryCode: "SA",
      address: "Jeddah",
    },
    {
      id: 2162,
      code: "MED",
      name: "Prince Mohammad Bin Abdulaziz Intl Airport",
      cityCode: "MED",
      cityName: "Madinah",
      countryName: "SAUDI ARABIA",
      countryCode: "SA",
      address: "Madinah",
    },
  ],
  departureDates: initialFromDates,
  arrivalDates: initialToDates,
  segmentCount: 1,
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setAdultCount(state, action: PayloadAction<number>) {
      state.adultCount = action.payload;
    },
    setChildCount(state, action: PayloadAction<number[]>) {
      state.childCount = action.payload;
    },
    setInfantCount(state, action: PayloadAction<number>) {
      state.infantCount = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },

    setFromSegmentLists(state, action: PayloadAction<Segment[]>) {
      state.fromSegmentLists = action.payload;
    },
    setToSegmentLists(state, action: PayloadAction<Segment[]>) {
      state.toSegmentLists = action.payload;
    },
    setDepartureDates(state, action: PayloadAction<string[]>) {
      state.departureDates = action.payload;
    },
    setArrivalDates(state, action: PayloadAction<string[]>) {
      state.arrivalDates = action.payload;
    },
    setSegmentCount(state, action: PayloadAction<number>) {
      state.segmentCount = action.payload;
    },
    incrementSegmentCount(state) {
      if (state.value === "multicity" && state.segmentCount < 5) {
        state.segmentCount += 1;
      }
    },
    removeSegment(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 2 && index < state.segmentCount) {
        state.fromSegmentLists.splice(index, 1);
        state.toSegmentLists.splice(index, 1);
        state.departureDates.splice(index, 1);
        state.arrivalDates.splice(index, 1);
        state.segmentCount = Math.max(state.segmentCount - 1, 1);
      } else {
        // Instead of calling setValue reducer, just update value directly here
        state.value = "return";
        state.segmentCount = 1;
      }
    },
  },
});

export const {
  setAdultCount,
  setChildCount,
  setInfantCount,
  setValue,
  setFromSegmentLists,
  setToSegmentLists,
  setDepartureDates,
  setArrivalDates,
  setSegmentCount,
  incrementSegmentCount,
  removeSegment,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
