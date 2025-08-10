import React from "react";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { RootState } from "../../../../../store";

interface AirportSelectorProps {
  type: "from" | "to";
  onSelect: (airport: AirportType) => void;
}

export interface AirportType {
  id: number;
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  address: string;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({
  type,
  onSelect,
}) => {
  const fromSegmentLists = useSelector(
    (state: RootState) => state.flightSearch.fromSegmentLists
  );
  const toSegmentLists = useSelector(
    (state: RootState) => state.flightSearch.toSegmentLists
  );

  const airports = type === "from" ? fromSegmentLists : toSegmentLists;

  return (
    <div className="bg-white w-full max-w-sm rounded-sm shadow-lg">
      {/* Search Bar */}
      <div className="flex items-center gap-2 px-4 py-2 shadow-md">
        <IoSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder={`${type === "from" ? "From" : "To"}`}
          className="flex-1 outline-none text-gray-700"
        />
      </div>
      <div className="overflow-y-auto h-60 max-h-[600px]">
        {/* Recent Search Header */}
        <div className="px-2 pt-2 text-xs text-gray-400 font-semibold">
          RECENT SEARCH
        </div>

        {/* Airport List */}
        <div>
          {airports?.map((airport, index) => (
            <div
              key={airport.id}
              onClick={() => onSelect(airport)}
              className={`mt-3 px-2 cursor-pointer hover:bg-gray-100 ${
                index === airports.length - 1 ? "mb-2" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-black text-sm">
                    {airport.cityName}, {airport.countryName}
                  </p>
                  <p className="text-[12px] text-gray-400">{airport.name}</p>
                </div>
                <p className="font-bold text-sm text-gray-500">
                  {airport.code}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirportSelector;
