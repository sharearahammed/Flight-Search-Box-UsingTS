import { useState } from "react";
import SearchBox from "./SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSegmentCount, setValue } from "./flightSearchSlice";

const FlightSearch = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.flightSearch.value);
  return (
    <div>
      <div className="flex space-x-6 bg-white rounded-md px-4 py-3 w-max">
        {[
          { label: "One Way", value: "oneway" },
          { label: "Round Trip", value: "return" },
          { label: "Multi City", value: "multicity" },
        ].map(({ label, value }) => (
          <label
            key={value}
            className={`cursor-pointer pr-2.5 pl-2 py-0.5 rounded-xl flex items-center gap-1.5 text-sm
            ${selected === value ? "bg-[#eaf5ff] text-black" : "text-black"} ${
              selected === value ? "font-[600]" : "font-[400]"
            }`}
          >
            <input
              type="radio"
              name="tripType"
              value={value}
              checked={selected === value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const tripType = e.target.value as
                  | "oneway"
                  | "return"
                  | "multicity";
                dispatch(setValue(tripType));
                dispatch(setSegmentCount(tripType === "multicity" ? 2 : 1));
              }}
              className="hidden"
            />
            {/* Custom radio circle */}
            <span
              className={`w-3 h-3 flex-shrink-0 rounded-full border-1 flex items-center justify-center
    ${
      selected === value
        ? "border-[#008cff] bg-[#008cff]"
        : "border-[#9b9b9b] bg-white"
    }`}
            >
              {selected === value ? (
                // Show white checkmark inside when selected
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                // Empty inner circle when not selected
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </span>

            {label}
          </label>
        ))}
      </div>
      <div className="px-2">
        <SearchBox />
      </div>
    </div>
  );
};

export default FlightSearch;
