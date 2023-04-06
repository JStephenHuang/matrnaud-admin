import { Link } from "react-router-dom";
import { usePhotos } from "../hooks/usePhotos";
import { IoClose } from "react-icons/io5";
import { IPhoto } from "../types/photo";
import { motion } from "framer-motion";

import Navbar from "../components/navbar";

const Photo = ({
  photo,
  deletePhoto,
}: {
  photo: IPhoto;
  deletePhoto: (photoId: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: photo.popularity }}
      id="gallery-items"
    >
      {/* <button onClick={() => deletePhoto(photo.id)} className="absolute z-10">
        <IoClose
          className="m-2 rounded-full bg-yellow-300 text-white"
          size={12}
        />
      </button> */}
      <Link to={`/photo/${photo.id}`}>
        <img
          className="hover:opacity-70 transition-all w-full h-auto"
          src={photo.mainPhoto}
        />
      </Link>
    </motion.div>
  );
};

const Gallery = () => {
  const { photos, uploadPhoto, deletePhoto } = usePhotos();

  if (photos === undefined) return <div>Loading</div>;

  console.log(photos);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: 0.2 }}
    >
      <div id="gallery">
        {photos.map((photo, key) => (
          <Photo key={key} photo={photo} deletePhoto={deletePhoto} />
        ))}
        <label
          className="aspect-square border text-gray-400 rounded-sm grid place-items-center"
          htmlFor={`dropbox`}
        >
          Upload image
          <input
            id={`dropbox`}
            type="file"
            className="hidden"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                uploadPhoto(event.target.files[0]);
              }
            }}
          />
        </label>
      </div>
    </motion.div>
  );
};

const MainPage = () => {
  return (
    <div className="h-screen">
      <header className="h-[9.5%]">
        <Navbar />
      </header>
      <Gallery />
    </div>
  );
};

export default MainPage;
