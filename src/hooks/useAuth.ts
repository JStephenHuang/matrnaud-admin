import Cookies from "js-cookie";
import { backend } from "../helper/backend";
import { useState } from "react";

export const useAuth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        Cookies.set("auth", "true", { expires: 1 });
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

  return { login, username, password, onChange };
};
