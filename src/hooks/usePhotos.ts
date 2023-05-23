import { useEffect, useState } from "react";

import { IPhoto } from "../types/photo";
import { backend } from "../helper/backend";
import { sortByPop } from "../helper/sortByPop";

export const usePhotos = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  useEffect(() => {
    (async () => {
      const res = await backend
        .get("/photos")
        .catch((error) => console.log(error));

      if (res) {
        setPhotos(res.data.sort(sortByPop));
      }
    })();
  }, []);

  return { photos };
};

export const usePhoto = (photoId: string) => {
  const [photo, setPhoto] = useState<IPhoto>();
  useEffect(() => {
    (async () => {
      const res = await backend
        .get(`/photos/${photoId}`)
        .catch((error) => console.log(error));

      if (res) {
        setPhoto(res.data);
      }
    })();
  }, []);
  return { photo };
};
