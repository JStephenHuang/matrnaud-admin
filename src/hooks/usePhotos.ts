import { useEffect, useState } from "react";

import { IPhoto } from "../types/photo";
import { useBackend } from "./useBackend";

export const usePhotos = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const backend = useBackend();

  const sortByPop = (a: IPhoto, b: IPhoto) =>
    Number(a.popularity) - Number(b.popularity);

  const uploadPhoto = async (file: File) => {
    const form = new FormData();
    form.append("photo", file);
    const res = await backend
      .post(`/photos`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => console.log(error));

    if (res) setPhotos(res.data.sort(sortByPop));
  };

  const deletePhoto = async (photoId: string) => {
    const res = await backend
      .delete(`/photos/${photoId}`)
      .catch((error) => console.log(error));

    if (res) setPhotos(res.data.sort(sortByPop));
  };

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

  return { photos, uploadPhoto, deletePhoto };
};

export const usePhoto = (photoId: string) => {
  const [photo, setPhoto] = useState<IPhoto>();

  const backend = useBackend();

  const uploadPhoto = async (files: FileList) => {
    const form = new FormData();
    for (const file of files) {
      form.append("photos", file);
    }
    const res = await backend
      .post(`/photos/${photoId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error) => console.log(error));

    if (res) setPhoto(res.data);
  };

  const deletePhoto = async (photoshootPhotoId: string) => {
    const res = await backend
      .put(`/photos/${photoId}/${photoshootPhotoId}`)
      .catch((error) => console.log(error));

    if (res) setPhoto(() => res.data);
  };

  const updatePhoto = async () => {
    if (photo === undefined) return;
    const res = await backend
      .put(`/photos/${photoId}`, { photo: photo })
      .catch((error) => console.log(error));

    if (res) setPhoto(res.data);
  };

  const updateMainPhoto = async (file: File) => {
    const form = new FormData();
    form.append("photo", file);
    const res = await backend
      .put(`/photos/main/${photoId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => console.log(error));

    if (res) setPhoto(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await backend
        .get(`/photos/${photoId}`)
        .catch((error) => console.log(error));

      if (res) setPhoto(res.data);
    })();
  }, []);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (photo === undefined) return;
    setPhoto({ ...photo, title: event.target.value });
  };
  const onDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (photo === undefined) return;
    setPhoto({ ...photo, description: event.target.value });
  };

  const onPopularityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (photo === undefined) return;
    setPhoto({ ...photo, popularity: event.target.value });
  };

  const onChange = {
    title: onTitleChange,
    description: onDescriptionChange,
    popularity: onPopularityChange,
  };

  return {
    photo,
    uploadPhoto,
    deletePhoto,
    updatePhoto,
    updateMainPhoto,
    onChange,
  };
};
