import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";


const LoginModal: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [emailOrMobile, setEmailOrMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agree1, setAgree1] = useState<boolean>(false);
  const [agree2, setAgree2] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState("");

  const validateUsername = (name: string) => /^[a-zA-Z0-9]{3,}$/.test(name);

  const validatePassword = (pass: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(
      pass
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUsername(emailOrMobile)) {
      setError(
        "Username must be at least 3 characters and contain only letters and numbers."
      );
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters, include at least one letter, one number, and a special character."
      );
      return;
    }

    const success = login(emailOrMobile, password);

    if (success) {
      setError("");
      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  useEffect(() => {
    const emailMobileValid = emailOrMobile.trim().length > 0;
    const passwordValid = password.trim().length >= 6;
    setIsValid(emailMobileValid && passwordValid && agree1 && agree2);
  }, [emailOrMobile, password, agree1, agree2]);

  return (
    <div className="max-w-md mx-auto bg-white text-[#4a4a4a] rounded-lg shadow-lg p-6">
      <h2 className="mb-6 leading-snug text-2xl font-bold">
        Login now to get <span>FLAT 12% OFF*</span> on your first flight booking
      </h2>

      {/* Google login button */}
      <button className="w-full border rounded-md py-2 flex items-center justify-center gap-2 mb-6 hover:bg-gray-50">
        <FcGoogle />
        Continue with Google
      </button>

      {/* Divider with text */}
      <div className="relative flex items-center mb-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm whitespace-nowrap">
          Or Login/Signup With
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Show error message */}
      {error && (
        <p className="text-red-600 text-sm mb-4 font-semibold">{error}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email or Mobile Number
          <input
            type="text"
            value={emailOrMobile}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmailOrMobile(e.target.value)
            }
            placeholder="Enter email or mobile number"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-4 text-sm font-medium text-gray-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 rounded-md text-white font-semibold mb-4 ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          CONTINUE
        </button>
      </form>

      <label className="inline-flex items-center mb-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={agree1}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAgree1(e.target.checked)
          }
          className="mr-2 flex-shrink-0"
        />
        <span>
          By signing in or creating an account, you agree to MakeMyTrip's{" "}
          <span className="text-[#008cff]">Privacy Policy</span>,{" "}
          <span className="text-[#008cff]">User Agreement</span> and{" "}
          <span className="text-[#008cff]">T&Cs</span>
        </span>
      </label>

      <label className="flex items-start text-xs text-gray-600">
        <input
          type="checkbox"
          checked={agree2}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAgree2(e.target.checked)
          }
          className="mr-2 mt-1"
        />
        I hereby allow MakeMyTrip to contact me regarding travel services, that
        may be of interest to me
      </label>
    </div>
  );
};

export default LoginModal;
