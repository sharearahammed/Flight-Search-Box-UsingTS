import moment from "moment";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { IoIosArrowDown } from "react-icons/io";

interface DatePickerCardProps {
  label: string;
  initialDate?: Date;
  onSelectDate?: (date: Date) => void;
}

const DatePickerCard: React.FC<DatePickerCardProps> = ({
  label,
  initialDate = new Date(),
  onSelectDate,
}) => {
  const [selected, setSelected] = useState<Date | undefined>(initialDate);
  const [open, setOpen] = useState(false);

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

  return (
    <div className="relative inline-block bg-white p-4 border border-[#e7e7e7] cursor-pointer select-none">
      <div className="text-sm text-black mb-1 flex items-center gap-1">
        <span>{label}</span>{" "}
        <span>
          <IoIosArrowDown className="text-[#008cff] text-lg" />
        </span>
      </div>
      <div onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
          <span className="text-3xl font-semibold text-gray-900">{day}</span>
          <span className="text-lg text-black mt-2">{monthYear}</span>
        </div>
        <div className="text-black text-sm mt-1">{formattedDay}</div>
      </div>

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
