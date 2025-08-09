import LoginForm from "../components/LoginForm/LoginForm";

const Login = ({setIsLoginOpen}) => {
  return (
    <div className="p-4">
      <LoginForm setIsLoginOpen={setIsLoginOpen} />
    </div>
  );
};

export default Login;
