import { useDispatch, useSelector } from "react-redux";
import DatePickerCard from "../components/DatePickerCard";
import InfoCard from "../components/SuggestionBox/InfoCard";
import TravelersClassSelector from "../components/TravelersClassSelector";
import { RootState } from "../../../../store";
import * as React from "react";
import {
  incrementSegmentCount,
  removeSegment,
  setSegmentCount,
  setValue,
  swapSegments,
} from "../flightSearchSlice";
import { IoIosClose } from "react-icons/io";

const SearchBox = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.flightSearch.value);
  const segmentCount = useSelector(
    (state: RootState) => state.flightSearch.segmentCount
  );
  const fromSegmentLists = useSelector(
    (state: RootState) => state.flightSearch.fromSegmentLists
  );
  const toSegmentLists = useSelector(
    (state: RootState) => state.flightSearch.toSegmentLists
  );

  return (
    <div>
      <div
        className={`grid sm:gap-4 xs:gap-4 md:gap-0
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-15
        `}
      >
        {[...Array(segmentCount)]?.map((_, i) => {
          const from = fromSegmentLists[i];
          const to = toSegmentLists[i];

          return (
            <React.Fragment key={i}>
              {/* From */}
              <div className="col-span-4 lg:col-span-3 xl:col-span-4 relative mb-3">
                <InfoCard
                  label={segmentCount > 1 ? `From ${i + 1}` : "From"}
                  city={from?.cityName || ""}
                  airportInfo={from ? `${from.code}, ${from.name}` : ""}
                  type="from"
                  index={i}
                />
                {/* Swap icon or other UI could go here */}
                <div
                  onClick={() => dispatch(swapSegments(i))}
                  className="z-10 absolute top-9 right-[-20px] bg-[#fff] shadow-md p-4 rounded-3xl h-10 w-10 flex items-center justify-center cursor-pointer"
                >
                  <span className="text-[#008cff]">⇌</span>
                </div>
              </div>

              {/* To */}
              <div className="col-span-4 lg:col-span-3 xl:col-span-4">
                <InfoCard
                  label={segmentCount > 1 ? `To ${i + 1}` : "To"}
                  city={to?.cityName || ""}
                  airportInfo={to ? `${to.code}, ${to.name}` : ""}
                  type="to"
                  index={i}
                />
              </div>

              {/* Departure Date */}
              <div className="col-span-4 lg:col-span-3 xl:col-span-2">
                <DatePickerCard label="Departure" tripType={selected} />
              </div>

              {/* Return Date only if not multicity and only on first segment */}
              {selected !== "multicity" && i === 0 && (
                <div className="col-span-4 lg:col-span-3 xl:col-span-2">
                  <DatePickerCard tripType={selected} label="Return" />
                </div>
              )}
              {/* Travelers/Classes Selector - usually outside segment mapping */}
              {i === 0 && (
                <div
                  className={`${
                    selected === "multicity" ? "col-span-5" : "col-span-3"
                  }`}
                >
                  <TravelersClassSelector
                    travellers={1}
                    classType="Economy/Premium"
                    // onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    //   console.log("Open selector");
                    // }}
                  />
                </div>
              )}
              {i !== 0 && (
                <div
                  className={`${
                    selected === "multicity" ? "col-span-5" : "col-span-3"
                  }`}
                >
                  <div className="flex justify-between items-center px-8 h-28 rounded-tr-lg rounded-br-lg border border-[#e7e7e7] ">
                    {i !== 0 && i === segmentCount - 1 && (
                      <div
                        onClick={() => {
                          if (i !== 4) {
                            dispatch(incrementSegmentCount());
                          }
                        }}
                        className={`col-span-3 text-[15px] text-[#008cff] px-3 py-1 rounded-sm font-semibold i === 4 ? "shadow-none" : "shadow-xl"  cursor-pointer ${
                          i === 4 ? "border-none" : "border"
                        }`}
                      >
                        {" "}
                        {i === 4 ? "" : " + ADD ANOTHER CITY"}
                      </div>
                    )}
                    {i !== 0 && i === segmentCount - 1 && (
                      <div className="border-l border-[#e7e7e7] h-[100px] flex justify-center items-center">
                        <div
                          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            if (segmentCount === 2) {
                              dispatch(setValue("return"));
                              dispatch(setSegmentCount(1));
                            } else {
                              dispatch(removeSegment(i));
                            }
                          }}
                          className="bg-gray-400 flex justify-center items-center rounded-3xl h-[28px] w-[28px] ml-8 cursor-pointer"
                        >
                          <IoIosClose className="text-white text-2xl" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Search button */}
      <div className="flex justify-center items-center pt-10 mb-[-95px] cursor-pointer">
        <p
          className="text-white font-semibold text-center py-1.5 rounded-3xl text-sm lg:text-xl xl:text-2xl w-[110px] lg:w-[200px] xl:w-[216px]"
          style={{
            backgroundImage: "linear-gradient(96deg, #53b2fe, #065af3)",
          }}
        >
          SEARCH
        </p>
      </div>
    </div>
  );
};

export default SearchBox;
