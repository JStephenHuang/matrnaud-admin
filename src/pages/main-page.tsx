import Cookies from "js-cookie";
import { IPhoto } from "../types/photo";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Masonry from "@mui/lab/Masonry";
import Navbar from "../components/navbar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotos } from "../hooks/usePhotos";

const Photo = ({
  photo,
  deletePhoto,
}: {
  photo: IPhoto;
  deletePhoto: (photoId: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => deletePhoto(photo.id)} className="absolute z-10">
        <IoClose className="m-2 rounded-full bg-red-500 text-white" size={20} />
      </button>
      <Link to={`/photo/${photo.id}`}>
        <img
          className="hover:opacity-70 transition-all w-full h-auto"
          src={photo.mainPhoto}
        />
      </Link>
    </div>
  );
};

const MainPage = () => {
  const { photos, uploadPhoto, deletePhoto } = usePhotos();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      const authState = await isAuthenticated();
      if (!authState) {
        navigate("/login");
      }
    })();
  }, [document.cookie]);

  return (
    <div>
      <Navbar />
      <Masonry columns={4} spacing={1}>
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
      </Masonry>
    </div>
  );
};

export default MainPage;
