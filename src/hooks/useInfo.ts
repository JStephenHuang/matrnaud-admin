import { useEffect, useState } from "react";

import { useBackend } from "./useBackend";

export const useInfo = () => {
  const backend = useBackend();

  const [bio, setBio] = useState<string>();
  const [bookingDescription, setBookingDescription] = useState<string>();

  const updateInfo = async () => {
    console.log(bio, bookingDescription);
    const res = await backend
      .put("/info", { bio: bio, bookingDescription: bookingDescription })
      .catch((error) => console.log(error));

    if (res) {
      setBio(res.data.bio.content);
      setBookingDescription(res.data.bookingDescription.content);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await backend
        .get("/info")
        .catch((error) => console.log(error));
      if (res) {
        setBio(res.data.bio.content);
        setBookingDescription(res.data.bookingDescription.content);
      }
    })();
  }, []);

  const onBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const onBookingDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBookingDescription(event.target.value);
  };

  return {
    bio,
    bookingDescription,
    updateInfo,
    onBioChange,
    onBookingDescriptionChange,
  };
};
