import { useAuth } from "../components/context/AuthContext";
import worldwide from "../assets/png/Worldwide.png";
import HomeSearchBox from "./HomeSearchBox/HomeSearchBox";

const Home = () => {
  const { user } = useAuth();
  return (
    <div
      style={{
        backgroundImage: `url(${worldwide})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="p-4 mt-[-110px] h-[90vh] lg:h-[70vh]"
    >
     <div className="flex flex-col container mx-auto px-4 lg:px-40">
       {/* <h1 className="text-3xl font-bold">Welcome to Home</h1>
      {user ? (
        <p className="mt-2 text-green-600">You are logged in as {user}</p>
      ) : (
        <p className="mt-2 text-red-600">You are not logged in.</p>
      )} */}
      <div>
        <HomeSearchBox/>
      </div>
     </div>
    </div>
  );
};

export default Home;
