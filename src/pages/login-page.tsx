import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, username, password, onChange } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      const authState = await isAuthenticated();
      if (authState) {
        navigate("/");
      }
    })();
  }, [document.cookie]);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <input
        className="p-2 border border-black mb-2"
        placeholder="Username"
        type="text"
        value={username}
        onChange={onChange.username}
      />
      <input
        className="p-2 border border-black mb-2"
        placeholder="Password"
        type="text"
        value={password}
        onChange={onChange.password}
      />
      <button
        className="px-4 py-2 border border-black bg-black text-white"
        onClick={login}
      >
        login
      </button>
    </div>
  );
};

export default LoginPage;
