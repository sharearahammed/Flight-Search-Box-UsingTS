import { useState } from "react";
import { SlPlane } from "react-icons/sl";
import { RiHotelFill } from "react-icons/ri";
import FlightSearch from "./FlightSearch/FlightSearch";
import HotelSearch from "./HotelSearch/HotelSearch";
import flight from "../../assets/png/flight.png"
import hotel from "../../assets/png/hotel.png"

const HomeSearchBox = () => {
  const [selected, setSelected] = useState<"flights" | "hotels">("flights");
  const activeColor = "#008cff";

  return (
    <div>
      <div className="flex items-center justify-center shadow-md mb-[-60px]">
        <div className="flex gap-17 bg-white items-center justify-center py-4 rounded-md w-86 shadow-sm">
          <div
            className="flex flex-col items-center justify-center gap-1 cursor-pointer relative"
            onClick={() => setSelected("flights")}
            style={{ color: selected === "flights" ? activeColor : "inherit" }}
          >
            <img src={flight} alt="flight" className="text-3xl w-12" />
            <span className={`text-sm ${selected === "flights" ? "font-bold" : ""}`}>Flights</span>

            {/* Border shown only if selected */}
            {selected === "flights" && (
              <div className="absolute -bottom-5 w-[50px] border-b-[3px] border-[#008cff]" />
            )}
          </div>

          <div
            className="flex flex-col items-center justify-center gap-2 cursor-pointer relative"
            onClick={() => setSelected("hotels")}
            style={{ color: selected === "hotels" ? activeColor : "inherit" }}
          >
            <img src={hotel} alt="flight" className="text-3xl w-12" />
            <span className={`text-sm ${selected === "hotels" ? "font-bold" : ""}`}>Hotels</span>

            {selected === "hotels" && (
              <div
                className="absolute -bottom-5 w-[50px] border-b-[3px]"
                style={{ borderColor: "#008cff" }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md py-18 px-3">
        {selected === "flights" ? <FlightSearch /> : <HotelSearch />}
      </div>
    </div>
  );
};

export default HomeSearchBox;
