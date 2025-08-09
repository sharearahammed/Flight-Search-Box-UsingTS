import React from "react";

interface TravelersClassSelectorProps {
  travellers: number;
  classType: string;
  onClick?: () => void;
}

const TravelersClassSelector: React.FC<TravelersClassSelectorProps> = ({
  travellers,
  classType,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-tr-lg rounded-br-lg border border-[#e7e7e7] cursor-pointer select-none"
    >
      <div className="text-xs text-gray-500 font-semibold mb-1">
        Travellers & Class
      </div>
      <div className="text-lg font-semibold text-gray-900">
        {travellers} Traveller{travellers > 1 ? "s" : ""}
      </div>
      <div className="text-sm text-gray-600 mt-0.5">{classType}</div>
    </div>
  );
};

export default TravelersClassSelector;
