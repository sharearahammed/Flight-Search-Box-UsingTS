import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

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
      className="bg-white hover:bg-[#eaf5ff] p-4 h-28 rounded-tr-lg rounded-br-lg border border-[#e7e7e7] cursor-pointer select-none">
      <div className="text-sm text-black mb-1 flex items-center gap-1">
        <span className="text-gray-500">Travellers & Class</span>
        <span>
          <IoIosArrowDown className="text-[#008cff] text-lg" />
        </span>
      </div>
      <div className="text-lg text-gray-900">
        <span className="text-3xl font-semibold mr-2"> {travellers}</span>
        Traveller <span className="text-xl"> {travellers > 1 ? 's' : ''}</span>
      </div>
      <div className="text-sm text-gray-600 mt-0.5">{classType}</div>
    </div>
  );
};

export default TravelersClassSelector;
