import DatePickerCard from '../components/DatePickerCard';
import InfoCard from '../components/InfoCard';
import TravelersClassSelector from '../components/TravelersClassSelector';

const SearchBox = () => {
  return (
    <div className="relative">
      <div
        className="grid sm:gap-4 xs:gap-4 md:gap-0
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-15
    ">
        <div className="col-span-4">
          <InfoCard
            label="From"
            city="Dhaka"
            airportInfo="DAC, Hazrat Shahjalal International Airport"
            type="from"
          />
        </div>

        <div className="col-span-4">
          <InfoCard
            label="To"
            city="Mumbai"
            airportInfo="BOM, Chhatrapati Shivaji International Airport"
            type="to"
            className="col-span-3"
          />
        </div>

        <div className="col-span-2">
          <DatePickerCard label="Departure" />
        </div>
        <div className="col-span-2">
          {' '}
          <DatePickerCard label="Return" />
        </div>

        <div className="col-span-3">
          <TravelersClassSelector
            travellers={1}
            classType="Economy/Premium Economy"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              console.log('Open selector');
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center pt-10 mb-[-95px] cursor-pointer">
        <p
          className="text-white font-semibold text-center py-1.5 rounded-3xl text-2xl"
          style={{
            backgroundImage: 'linear-gradient(96deg, #53b2fe, #065af3)',
            width: '216px',
          }}>
          SEARCH
        </p>
      </div>
      <div className="absolute top-9 left-[294px] bg-[#fff] shadow-md p-4 rounded-3xl h-10 w-10 flex items-center justify-center cursor-pointer">
        <span className="text-[#008cff]">⇌</span>
      </div>
    </div>
  );
};

export default SearchBox;
