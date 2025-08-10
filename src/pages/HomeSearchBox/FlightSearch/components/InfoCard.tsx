import React from 'react';

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
    type === 'from'
      ? 'rounded-tl-lg rounded-bl-lg'
      : type === 'to'
      ? ''
      : 'rounded-lg';

  return (
    <div
      className={`h-28 bg-white p-4 border border-[#e7e7e7] hover:bg-[#eaf5ff] cursor-pointer ${borderRadiusClass} ${
        type === 'to' ? 'pl-10' : ''
      }`}>
      <div className="text-sm mb-1 text-gray-500">{label}</div>
      <div className="text-3xl font-bold">{city}</div>
      <div className="text-sm mt-0.5 text-gray-500">
        {airportInfo.length > 38
          ? airportInfo.slice(0, 38) + '...'
          : airportInfo}
      </div>
    </div>
  );
};

export default InfoCard;
