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
  travelClass: string;
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
  travelClass: "Economy/Premium Economy",
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
    setTravelClass: (state, action: PayloadAction<string>) => {
      state.travelClass = action.payload;
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
        const nextCount = state.segmentCount + 1;

        // Replace arrays with slices of the initial arrays from your initialState
        state.segmentCount = nextCount;
        state.fromSegmentLists = initialState.fromSegmentLists.slice(
          0,
          nextCount
        );
        state.toSegmentLists = initialState.toSegmentLists.slice(0, nextCount);
        state.departureDates = initialState.departureDates.slice(0, nextCount);
        state.arrivalDates = initialState.arrivalDates.slice(0, nextCount);
      }
    },
    removeSegment(state, action: PayloadAction<number>) {
      const index = action.payload;
      const lastIndex = state.segmentCount - 1;
      if (index !== lastIndex || index === 0) return;
      if (index >= 2) {
        state.fromSegmentLists.splice(index, 1);
        state.toSegmentLists.splice(index, 1);
        state.departureDates.splice(index, 1);
        state.arrivalDates.splice(index, 1);
        state.segmentCount = state.segmentCount - 1;
      }
    },
    swapSegments(state, action: PayloadAction<number>) {
      const index = action.payload;

      // Validate index
      if (
        index >= 0 &&
        index < state.fromSegmentLists.length &&
        index < state.toSegmentLists.length
      ) {
        const temp = state.fromSegmentLists[index];
        state.fromSegmentLists[index] = state.toSegmentLists[index];
        state.toSegmentLists[index] = temp;
      }
    },
    setFromSegmentAtIndex(
      state,
      action: PayloadAction<{ index: number; segment: Segment }>
    ) {
      const { index, segment } = action.payload;
      if (index >= 0 && index < state.fromSegmentLists.length) {
        state.fromSegmentLists[index] = segment;
      }
    },

    setToSegmentAtIndex(
      state,
      action: PayloadAction<{ index: number; segment: Segment }>
    ) {
      const { index, segment } = action.payload;
      if (index >= 0 && index < state.toSegmentLists.length) {
        state.toSegmentLists[index] = segment;
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
  swapSegments,
  setFromSegmentAtIndex,
  setToSegmentAtIndex,
  setTravelClass,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
