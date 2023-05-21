import { useState } from "react";
import { backend } from "../helper/backend";

export const useEmail = () => {
  const defaultForm = {
    email: "",
    name: "",
    message: "",
  };

  const [form, setForm] = useState<{
    email: string;
    name: string;
    message: string;
  }>(defaultForm);

  const [error, setError] = useState<string>("");

  const sendEmail = async () => {
    if (form.email === "" || form.name === "" || form.message === "") {
      setError("Form not filled");
      return;
    }

    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    if (!regex.test(form.email)) {
      setError("Email not valid.");
      return;
    }

    const res = await backend
      .post("/email", form)
      .catch((error) => console.log(error));

    if (res) {
      if (res.data.status === "Success") {
        setForm({ email: "", name: "", message: "" });
        setError(res.data.message);
      } else if (res.data.status === "Error") {
        setError(res.data.message);
      }
    }
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: event.target.value });
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: event.target.value });
  };
  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, message: event.target.value });
  };

  const onChange = {
    email: onEmailChange,
    name: onNameChange,
    message: onMessageChange,
  };

  return { sendEmail, form, onChange, error };
};
