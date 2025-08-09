import React from "react";

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
  const borderRadiusClass =
    type === "from"
      ? "rounded-tl-lg rounded-bl-lg"
      : type === "to"
      ? ""
      : "rounded-lg";

  return (
    <div
      className={`bg-white p-4 border border-[#e7e7e7] ${borderRadiusClass}`}
    >
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-semibold text-[#222222]">{city}</div>
      <div className="text-sm text-[#222222] mt-0.5">{airportInfo}</div>
    </div>
  );
};

export default InfoCard;
