import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Login from "../../pages/Login";
import { IoMdClose } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav
      className="bg-white px-4 py-4 flex justify-between"
      style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px" }}
    >
      <div className="flex items-center justify-center space-x-6 min-w-full ">
        <Link
          to="/"
          className="mr-4 hover:underline flex flex-col items-center justify-center"
        >
          <FaHome />
          Home
        </Link>
        {!user && (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="mr-4 hover:underline cursor-pointer flex flex-col items-center justify-center"
          >
            <IoIosLogIn />
            Login
          </button>
        )}
      </div>
      {user && (
        <div>
          <span className="mr-4">Hi, {user}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
      {isLoginOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[3px] flex justify-center items-center z-50"
          onClick={() => setIsLoginOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full relative"
          >
            <Login />
            <div
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-[-10px] text-[22px] bg-[#fff] rounded-2xl p-0.5 cursor-pointer"
            >
              <IoMdClose className="text-[#222]" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
