import DatePickerCard from "../components/DatePickerCard";
import InfoCard from "../components/InfoCard";
import TravelersClassSelector from "../components/TravelersClassSelector";

const SearchBox = () => {
  return (
    <div>
      <div
        className="grid sm:gap-4 xs:gap-4 md:gap-0
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
    "
      >
        <InfoCard
          label="From"
          city="Jeddah"
          airportInfo="JED, King Abdulaziz Intl Saudi Arabia"
          type="from"
        />

        <InfoCard
          label="To"
          city="Dubai"
          airportInfo="DXB, Dubai Intl Airport"
          type="to"
        />

        <DatePickerCard label="Departure" />
        <DatePickerCard label="Return" />

        <TravelersClassSelector
          travellers={1}
          classType="Economy/Premium Economy"
          onClick={() => console.log("Open selector")}
        />
      </div>
      <div className="flex justify-center items-center pt-10 mb-[-95px]">
        <p
          className="text-white font-semibold text-center py-1.5 rounded-3xl text-2xl"
          style={{
            backgroundImage: "linear-gradient(96deg, #53b2fe, #065af3)",
            width: "216px",
          }}
        >
          SEARCH
        </p>
      </div>
    </div>
  );
};

export default SearchBox;
