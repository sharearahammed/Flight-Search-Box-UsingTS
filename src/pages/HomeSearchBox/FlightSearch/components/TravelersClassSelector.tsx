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
  // const { classType } = props;
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const { adultCount, childCount, infantCount, travelClass } = useSelector(
    (state: RootState) => state.flightSearch
  );
  const travellers = adultCount + childCount.length + infantCount;
  const classType = useSelector(
    (state: RootState) => state.flightSearch.travelClass
  );

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       wrapperRef.current &&
  //       !wrapperRef.current.contains(event.target as Node)
  //     ) {
  //       setOpenSearch(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative">
      <div
        // ref={wrapperRef}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          setOpenSearch(!openSearch);
        }}
        className="bg-white hover:bg-[#eaf5ff] p-4 h-28 rounded-tr-lg rounded-br-lg border border-[#e7e7e7] cursor-pointer select-none relative"
      >
        <div className="text-sm text-black mb-1 flex items-center gap-1">
          <span className={openSearch ? "text-[#008cff]" : "text-gray-500"}>
            Travellers & Class
          </span>
          <span>
            <IoIosArrowDown
              className={
                openSearch ? "text-[#008cff] text-lg" : "text-gray-500 text-lg"
              }
            />
          </span>
        </div>
        <div className="text-lg text-gray-900">
          <span className="text-xl lg:text-xl xl:text-3xl font-semibold mr-2">
            {" "}
            {travellers}
          </span>
          Traveller
          <span className=""> {travellers > 1 ? "'s" : ""}</span>
        </div>
        <div className="text-xs lg:text-sm text-gray-600 mt-0.5">
          {classType}
        </div>
      </div>

      {openSearch && (
        <>
          <div
            style={{
              scrollbarWidth: "thin",
            }}
            className="absolute w-[700px] max-w-2xl z-20 px-9 bg-white py-5 shadow-2xl rounded-lg right-0 hidden lg:block"
          >
            <TravelerSelector
              adultCount={adultCount}
              childCount={childCount}
              infantCount={infantCount}
              travelClass={travelClass}
              dispatch={dispatch}
            />
          </div>
          <div
            className={`fixed top-0 right-0 h-full lg:w-[700px] max-w-2xl z-20 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
  block lg:hidden
    ${openSearch ? "translate-x-0" : "translate-x-full"} p-4`}
          >
            <TravelerSelector
              adultCount={adultCount}
              childCount={childCount}
              infantCount={infantCount}
              travelClass={travelClass}
              dispatch={dispatch}
              setOpenSearch={setOpenSearch}
            />
          </div>
        </>
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
  setOpenSearch,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenChild, setDropdownOpenChild] = useState(false);
  const [dropdownOpenInfant, setDropdownOpenInfant] = useState(false);
  const [dropdownOpenClass, setDropdownOpenClass] = useState(false);
  const adults = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const children = [0, 1, 2, 3, 4, 5, 6];
  const infants = [0, 1, 2, 3, 4, 5, 6];
  const travelClasses = ["Economy", "Premium Economy", "Business", "First"];
  return (
    <div className="relative">
      {/* Adults */}
      <p
        onClick={() => {
          setOpenSearch(false);
        }}
        className="absolute right-0 lg:hidden block"
      >
        close
      </p>
      <div className="flex">
        <div>
          <p className="text-gray-700 text-[12.5px]">ADULTS (12y +)</p>
          <p className="text-gray-400 text-[12px]">on the day of travel</p>

          {/* Large screens: buttons */}
          <div className="hidden lg:flex mt-2 shadow-sm shadow-gray-200 border rounded-sm border-gray-200">
            {adults.map((num) => (
              <div
                key={num}
                onClick={() => dispatch(setAdultCount(num))}
                className={`px-4 py-2 rounded cursor-pointer ${
                  adultCount === num
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <p className="text-[12.5px]">{num}</p>
              </div>
            ))}
          </div>

          {/* Small/Medium screens: dropdown */}
          <div className="lg:hidden mt-2 relative">
            <button
              className="w-full px-4 py-2 text-left border rounded-sm shadow-sm border-gray-200 bg-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {adultCount} Adult{adultCount > 1 ? "s" : ""}
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-md">
                {adults.map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      dispatch(setAdultCount(num));
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {num} Adult{num > 1 ? "s" : ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-4 items-start lg:items-center flex-col lg:flex-row">
        {/* Children */}
        <div>
          <p className="text-gray-700 text-[12.5px]">CHILDREN (2y - 12y)</p>
          <p className="text-gray-400 text-[12px]">on the day of travel</p>

          {/* Large screens: buttons */}
          <div className="hidden lg:flex mt-2 shadow-sm shadow-gray-200 border rounded-sm border-gray-200">
            {children.map((num) => (
              <div
                key={num}
                onClick={() => dispatch(setChildCount([num]))}
                className={`px-4 py-2 rounded cursor-pointer ${
                  childCount[0] === num
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <p className="text-[12.5px]">{num}</p>
              </div>
            ))}
          </div>

          {/* Small/Medium screens: dropdown */}
          <div className="lg:hidden mt-2 relative">
            <button
              className="w-full px-4 py-2 text-left border rounded-sm shadow-sm border-gray-200 bg-white"
              onClick={() => setDropdownOpenChild(!dropdownOpenChild)}
            >
              {childCount[0]} Child{childCount[0] > 1 ? "ren" : ""}
            </button>
            {dropdownOpenChild && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-md">
                {children.map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      dispatch(setChildCount([num]));
                      setDropdownOpenChild(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {num} Child{num > 1 ? "ren" : ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Infants */}
        <div>
          <p className="text-gray-700 text-[12.5px]">INFANTS (below 2y)</p>
          <p className="text-gray-400 text-[12px]">on the day of travel</p>

          {/* Large screens: buttons */}
          <div className="hidden lg:flex mt-2 shadow-sm shadow-gray-200 border rounded-sm border-gray-200">
            {infants.map((num) => (
              <div
                key={num}
                onClick={() => dispatch(setInfantCount(num))}
                className={`px-4 py-2 rounded cursor-pointer ${
                  infantCount === num
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <p className="text-[12.5px]">{num}</p>
              </div>
            ))}
          </div>

          {/* Small/Medium screens: dropdown */}
          <div className="lg:hidden mt-2 relative">
            <button
              className="w-full px-4 py-2 text-left border rounded-sm shadow-sm border-gray-200 bg-white"
              onClick={() => setDropdownOpenInfant(!dropdownOpenInfant)}
            >
              {infantCount} Infant{infantCount > 1 ? "s" : ""}
            </button>
            {dropdownOpenInfant && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-md">
                {infants.map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      dispatch(setInfantCount(num));
                      setDropdownOpenInfant(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {num} Infant{num > 1 ? "s" : ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Travel Class */}
      <div className="mt-4">
        <p className="text-gray-700 text-[12.5px]">CHOOSE TRAVEL CLASS</p>

        {/* Large screens: buttons */}
        <div className="hidden lg:flex mt-2 space-x-2 shadow-sm shadow-gray-200 border rounded-sm border-gray-200">
          {travelClasses.map((cls) => (
            <div
              key={cls}
              onClick={() => dispatch(setTravelClass(cls))}
              className={`px-4 py-2 rounded-md cursor-pointer ${
                travelClass === cls
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <p className="text-[12.5px]">{cls}</p>
            </div>
          ))}
        </div>

        {/* Small/Medium screens: dropdown */}
        <div className="lg:hidden mt-2 relative">
          <button
            className="w-full px-4 py-2 text-left border rounded-sm shadow-sm border-gray-200 bg-white"
            onClick={() => setDropdownOpenClass(!dropdownOpenClass)}
          >
            {travelClass || "Select Class"}
          </button>
          {dropdownOpenClass && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-md">
              {travelClasses.map((cls) => (
                <div
                  key={cls}
                  onClick={() => {
                    dispatch(setTravelClass(cls));
                    setDropdownOpenClass(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {cls}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply button */}
      <div
        onClick={() => {
          setOpenSearch(false);
        }}
        className="flex justify-end mt-4"
      >
        <p className="px-6 py-2 bg-blue-500 text-white rounded-3xl text-[12.5px]">
          APPLY
        </p>
      </div>
    </div>
  );
};
