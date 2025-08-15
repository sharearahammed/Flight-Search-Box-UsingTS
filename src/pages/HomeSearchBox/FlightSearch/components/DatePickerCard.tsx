import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setValue } from "../flightSearchSlice";
import { addDays } from "date-fns";
import { IoIosClose } from "react-icons/io";

interface DatePickerCardProps {
  label: string;
  initialDate?: Date;
  onSelectDate?: (date: Date) => void;
  tripType: "oneway" | "return" | "multicity";
}

const DatePickerCard: React.FC<DatePickerCardProps> = ({
  label,
  initialDate = new Date(),
  onSelectDate,
  tripType,
}) => {
  const dispatch = useDispatch();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Date | undefined>(
    label === "Return" ? addDays(initialDate, 3) : addDays(initialDate, 1)
  );

  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (date?: Date) => {
    setSelected(date);
    onSelectDate && date && onSelectDate(date);
    setOpen(false);
  };

  // Format date parts
  const formattedDay = selected?.toLocaleDateString(undefined, {
    weekday: "long",
  });

  const day = selected ? moment(selected).format("D") : "";
  const monthYear = selected ? moment(selected).format(" MMM'YY") : "";

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={pickerRef}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => setOpen(!open)}
      className="relative bg-white hover:bg-[#eaf5ff] py-4 px-4 lg:px-3 xl:p-4 border border-[#e7e7e7] cursor-pointer select-none h-28"
    >
      <div className="flex justify-between">
        <div className="text-sm text-black mb-1 flex items-center gap-1">
          <div
            className={`text-sm mb-1 ${
              open ? "text-[#008cff]" : "text-gray-500"
            }`}
          >
            {label}
          </div>

          <span>
            <IoIosArrowDown
              className={`text-lg ${open ? "text-[#008cff]" : "text-gray-500"}`}
            />
          </span>
        </div>
        {tripType === "return" && label === "Return" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              dispatch(setValue("oneway"));
              setOpen(false);
            }}
            className="bg-gray-400 z-10 flex justify-center items-center rounded-3xl h-5 w-5"
          >
            <IoIosClose className="text-white text-2xl" />
          </div>
        )}
      </div>

      {tripType !== "return" && label === "Return" ? (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            dispatch(setValue("return"));
          }}
        >
          <p className="text-[#9b9b9b] lg:text-[10px] xl:text-[12px] font-bold">
            {" "}
            Tap to add a return date for bigger discounts
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
            <span className="text-xl lg:text-xl xl:text-3xl font-semibold text-gray-900">
              {day}
            </span>
            <span className="text-sm lg:text-xs xl:text-lg text-black mt-2">
              {monthYear}
            </span>
          </div>
          <div className="text-gray-500 text-xs lg:text-xs xl:text-sm mt-1">
            {formattedDay}
          </div>
        </div>
      )}

      {open && (
        <div className="absolute z-50 top-full mt-2 bg-white rounded-lg shadow-lg p-2">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            fixedWeeks
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerCard;
