import Cookies from "js-cookie";
import { useBackend } from "./useBackend";
import { useState } from "react";

export const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const backend = useBackend();

  const isAuthenticated = async () => {
    if (
      Cookies.get("username") === undefined ||
      Cookies.get("password") === undefined
    ) {
      return false;
    }

    const encodedCredentials = btoa(
      `${Cookies.get("username")}:${Cookies.get("password")}`
    );
    const res = await backend
      .post(
        "/auth",
        {},
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 401) return false;
      });

    if (res) {
      return res.status === 200;
    }
  };

  const login = async () => {
    if (username === "" || password === "") return;

    const encodedCredentials = btoa(`${username}:${password}`);

    const res = await backend
      .post(
        "/login",
        {},
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      )
      .catch((error) => console.log(error));

    if (res) {
      if (res.status === 200) {
        Cookies.set("username", username, { expires: 1 });
        Cookies.set("password", password, { expires: 1 });
        setUsername("");
        setPassword("");
      }
    }
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChange = {
    username: onUsernameChange,
    password: onPasswordChange,
  };

  return { login, username, password, onChange, isAuthenticated };
};
