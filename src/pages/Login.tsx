import LoginForm from '../components/LoginForm/LoginForm';

interface LoginProps {
  setIsLoginOpen: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoginOpen }) => {
  return (
    <div className="p-4">
      <LoginForm setIsLoginOpen={setIsLoginOpen} />
    </div>
  );
};

export default Login;
