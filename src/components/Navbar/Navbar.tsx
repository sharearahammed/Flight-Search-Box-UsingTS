import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Login from "../../pages/Login";
import { IoMdClose } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import mmtgblwhite from "../../assets/png/mmtgblwhite.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  return (
    <nav className="flex justify-between items-center py-4 relative">
      <Link to="/">
        <img
          src={mmtgblwhite}
          alt="Logo"
          className="h-8 w-auto cursor-pointer"
        />
      </Link>
      <div className="flex gap-5">
        {!user && (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="hover:underline cursor-pointer flex gap-2 items-center justify-center text-white text-[18px]"
          >
            <IoIosLogIn />
            Login
          </button>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span>Hi, {user}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
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
            <Login setIsLoginOpen={setIsLoginOpen} />
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
