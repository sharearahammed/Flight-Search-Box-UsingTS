import React, { useEffect, useRef, useState } from "react";
import AirportSelector from "./AirportSelector";
import {
  setFromSegmentAtIndex,
  setToSegmentAtIndex,
} from "../../flightSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";

interface InfoCardProps {
  label: string;
  city: string;
  airportInfo: string;
  type: string;
  index: number;
}

interface Segment {
  id: string;
  code: string;
  cityCode: string;
  cityName: string;
  countryName: string;
  name: string; // airport name
}

const InfoCard: React.FC<InfoCardProps> = (props: InfoCardProps) => {
  const { label, city, airportInfo, type, index } = props;
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openSearch, setOpenSearch] = useState<boolean>();
  const fromSegmentLists = useSelector(
    (state: RootState) => state.flightSearch.fromSegmentLists
  );
  const toSegmentLists = useSelector(
    (state: RootState) => state.flightSearch.toSegmentLists
  );
  const borderRadiusClass =
    type === "from"
      ? "rounded-tl-lg rounded-bl-lg"
      : type === "to"
      ? ""
      : "rounded-lg";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (airport: Segment) => {
    if (type === "from") {
      const currentTo = toSegmentLists[index];
      if (currentTo && currentTo.code === airport.code) {
        alert("From and To airports cannot be the same.");
        return;
      }

      dispatch(setFromSegmentAtIndex({ index, segment: airport }));
    } else {
      const currentFrom = fromSegmentLists[index];
      if (currentFrom && currentFrom.code === airport.code) {
        alert("From and To airports cannot be the same.");
        return;
      }
      dispatch(setToSegmentAtIndex({ index, segment: airport }));
    }
    setOpenSearch(false);
  };

  return (
    <div
      ref={wrapperRef}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        setOpenSearch(!openSearch);
      }}
      className={`relative h-28 bg-white py-4 px-4 lg:px-3 xl:p-4 border border-[#e7e7e7] hover:bg-[#eaf5ff] cursor-pointer ${borderRadiusClass} ${
        type === "to" ? "lg:pl-6 xl:pl-10" : ""
      }`}
    >
      <div>
        <div
          className={`text-sm mb-1 ${
            openSearch ? "text-[#008cff]" : "text-gray-500"
          }`}
        >
          {label}
        </div>

        <div className="text-xl lg:text-xl xl:text-3xl font-bold">{city}</div>
        <div className="text-xs lg:text-xs xl:text-sm mt-0.5 text-gray-500">
          {airportInfo.length > 38
            ? airportInfo.slice(0, 38) + "..."
            : airportInfo}
        </div>
      </div>
      {openSearch && (
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="absolute w-full left-0 z-20"
        >
          <AirportSelector type={type} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

export default InfoCard;
