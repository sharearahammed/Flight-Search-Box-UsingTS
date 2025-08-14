import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
  setAdultCount,
  setChildCount,
  setInfantCount,
  setTravelClass,
} from "../flightSearchSlice";

interface TravelersClassSelectorProps {
  travellers: number;
  classType: string;
  onClick?: () => void;
}

const adults = Array.from({ length: 9 }, (_, i) => i + 1);
const children = Array.from({ length: 7 }, (_, i) => i);
const infants = Array.from({ length: 7 }, (_, i) => i);
const travelClasses = [
  "Economy/Premium Economy",
  "Premium Economy",
  "Business",
  "First Class",
];

const TravelersClassSelector: React.FC<TravelersClassSelectorProps> = (
  props: TravelersClassSelectorProps
) => {
  const { travellers, classType } = props;
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openSearch, setOpenSearch] = useState<boolean>();
  const { adultCount, childCount, infantCount, travelClass } = useSelector(
    (state: RootState) => state.flightSearch
  );

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

  return (
    <div
      ref={wrapperRef}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        setOpenSearch(!openSearch);
      }}
      className="bg-white hover:bg-[#eaf5ff] p-4 h-28 rounded-tr-lg rounded-br-lg border border-[#e7e7e7] cursor-pointer select-none relative"
    >
      <div className="text-sm text-black mb-1 flex items-center gap-1">
        <span className="text-gray-500">Travellers & Class</span>
        <span>
          <IoIosArrowDown className="text-[#008cff] text-lg" />
        </span>
      </div>
      <div className="text-lg text-gray-900">
        <span className="text-3xl font-semibold mr-2"> {travellers}</span>
        Traveller <span className="text-xl"> {travellers > 1 ? "s" : ""}</span>
      </div>
      <div className="text-sm text-gray-600 mt-0.5">{classType}</div>
      {openSearch && (
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="w-[600px] z-20 space-y-4 p-4 border rounded-lg bg-white sticky ml-[-382px]"
        >
          <TravelerSelector
            adultCount={adultCount}
            childCount={childCount}
            infantCount={infantCount}
            travelClass={travelClass}
            dispatch={dispatch}
          />
        </div>
      )}
    </div>
  );
};

export default TravelersClassSelector;

const TravelerSelector = ({
  adultCount,
  childCount,
  infantCount,
  travelClass,
  dispatch,
}) => {
  return (
    <div>
      {/* Adults */}
      <div>
        <p className="font-semibold text-gray-700">ADULTS (12y +)</p>
        <p className="text-gray-400 text-sm">on the day of travel</p>
        <div className="flex mt-2 space-x-2">
          {adults.map((num) => (
            <div
              key={num}
              onClick={() => dispatch(setAdultCount(num))}
              className={`px-4 py-2 rounded border cursor-pointer ${
                adultCount === num
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Children */}
      <div>
        <p className="font-semibold text-gray-700">CHILDREN (2y - 12y)</p>
        <p className="text-gray-400 text-sm">on the day of travel</p>
        <div className="flex mt-2 space-x-2">
          {children.map((num) => (
            <div
              key={num}
              onClick={() => dispatch(setChildCount([num]))}
              className={`px-4 py-2 rounded border cursor-pointer ${
                childCount[0] === num
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Infants */}
      <div>
        <p className="font-semibold text-gray-700">INFANTS (below 2y)</p>
        <p className="text-gray-400 text-sm">on the day of travel</p>
        <div className="flex mt-2 space-x-2">
          {infants.map((num) => (
            <div
              key={num}
              onClick={() => dispatch(setInfantCount(num))}
              className={`px-4 py-2 rounded border cursor-pointer ${
                infantCount === num
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Travel Class */}
      <div>
        <p className="font-semibold text-gray-700">CHOOSE TRAVEL CLASS</p>
        <div className="flex mt-2 space-x-2">
          {travelClasses.map((cls) => (
            <div
              key={cls}
              onClick={() => dispatch(setTravelClass(cls))}
              className={`px-4 py-2 rounded border cursor-pointer ${
                travelClass === cls
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {cls}
            </div>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <div className="flex justify-end mt-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
          APPLY
        </button>
      </div>
    </div>
  );
};
