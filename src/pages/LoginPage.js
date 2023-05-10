import LoginForm from "../components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import Header from "../components/Header";

function LoginPage() {
  const authState = useSelector((state) => state.isAuthenticated);

  return (
    <>
      {authState && <Header />}
      {!authState && <LoginForm />}
    </>
  );
}

export default LoginPage;
