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
      <div>
        {/* Desktop (lg and up) */}
        <div className="hidden lg:flex space-x-1 xl:space-x-6 bg-white rounded-md px-4 py-3 w-max">
          {[
            { label: "One Way", value: "oneway" },
            { label: "Round Trip", value: "return" },
            { label: "Multi City", value: "multicity" },
          ].map(({ label, value }) => (
            <label
              key={value}
              className={`cursor-pointer pr-2.5 pl-2 py-0.5 rounded-xl flex items-center gap-1.5 text-sm
          ${selected === value ? "bg-[#eaf5ff] text-black" : "text-black"} 
          ${selected === value ? "font-[600]" : "font-[400]"}`}
            >
              <input
                type="radio"
                name="tripType"
                value={value}
                checked={selected === value}
                onChange={(e) => {
                  const tripType = e.target.value as
                    | "oneway"
                    | "return"
                    | "multicity";
                  dispatch(setValue(tripType));
                  dispatch(setSegmentCount(tripType === "multicity" ? 2 : 1));
                }}
                className="hidden"
              />
              <span
                className={`w-3 h-3 flex-shrink-0 rounded-full border-1 flex items-center justify-center
            ${
              selected === value
                ? "border-[#008cff] bg-[#008cff]"
                : "border-[#9b9b9b] bg-white"
            }`}
              >
                {selected === value ? (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </span>
              {label}
            </label>
          ))}
        </div>

        {/* Mobile/Tablet (below lg) */}
        <div className="block lg:hidden">
          <select
            value={selected}
            onChange={(e) => {
              const tripType = e.target.value as
                | "oneway"
                | "return"
                | "multicity";
              dispatch(setValue(tripType));
              dispatch(setSegmentCount(tripType === "multicity" ? 2 : 1));
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="oneway">One Way</option>
            <option value="return">Round Trip</option>
            <option value="multicity">Multi City</option>
          </select>
        </div>
      </div>

      <div className="p-0 lg:px-2 mt-3 lg:mt-0">
        <SearchBox />
      </div>
    </div>
  );
};

export default FlightSearch;
