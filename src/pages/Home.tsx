import { useAuth } from "../components/context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Welcome to Home</h1>
      {user ? (
        <p className="mt-2 text-green-600">You are logged in as {user}</p>
      ) : (
        <p className="mt-2 text-red-600">You are not logged in.</p>
      )}
    </div>
  );
};

export default Home;
