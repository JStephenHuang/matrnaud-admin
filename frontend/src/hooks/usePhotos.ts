import { useEffect, useState } from "react";
import { IPhoto } from "../types/photo";

import axios from "axios";

const backend = axios.create({ baseURL: "http://localhost:9000" });

export const usePhotos = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const uploadPhoto = async (file: File) => {
    const form = new FormData();
    form.append("photo", file);
    const res = await backend
      .put(`/photos`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error) => console.log(error));

    if (res)
      setPhotos(res.data.sort((a: any, b: any) => a.popularity - b.popularity));
  };

  const deletePhoto = async (photoId: string) => {
    const res = await backend
      .delete(`/photos/${photoId}`)
      .catch((error) => console.log(error));

    if (res)
      setPhotos(res.data.sort((a: any, b: any) => a.popularity - b.popularity));
  };

  useEffect(() => {
    (async () => {
      const res = await backend
        .get("/photos")
        .catch((error) => console.log(error));

      if (res) {
        setPhotos(
          res.data.sort((a: any, b: any) => a.popularity - b.popularity)
        );
      }
    })();
  }, []);

  return { photos, uploadPhoto, deletePhoto };
};

export const usePhoto = (photoId: string) => {
  const [photo, setPhoto] = useState<IPhoto>();

  const uploadPhoto = async (file: File) => {
    const form = new FormData();
    form.append("photo", file);
    const res = await backend
      .put(`/photos/${photoId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error) => console.log(error));

    if (res) setPhoto(res.data);
  };

  const deletePhoto = async (photoshootPhotoId: string) => {
    const res = await backend
      .put(`/photos/${photoId}/${photoshootPhotoId}`)
      .catch((error) => console.log(error));

    if (res) {
      console.log(res.data);
      setPhoto(() => res.data);
    }
  };

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
  return { photo, uploadPhoto, deletePhoto };
};
