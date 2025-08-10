import React, { useEffect, useRef, useState } from "react";
import AirportSelector from "./AirportSelector";

interface InfoCardProps {
  label: string;
  city: string;
  airportInfo: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  city,
  airportInfo,
  type,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openSearch, setOpenSearch] = useState<boolean>();
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

  return (
    <div
      ref={wrapperRef}
      onClick={() => {
        setOpenSearch(!openSearch);
      }}
      className={`relative h-28 bg-white p-4 border border-[#e7e7e7] hover:bg-[#eaf5ff] cursor-pointer ${borderRadiusClass} ${
        type === "to" ? "pl-10" : ""
      }`}
    >
      <div>
        <div className="text-sm mb-1 text-gray-500">{label}</div>
        <div className="text-3xl font-bold">{city}</div>
        <div className="text-sm mt-0.5 text-gray-500">
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
          className="absolute w-full left-0"
        >
          <AirportSelector
            type={type}
            onSelect={(airport: any) => {
              console.log("Selected airport:", airport);
              // You can dispatch Redux action here
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InfoCard;
