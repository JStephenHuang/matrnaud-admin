import { useParams, Link } from "react-router-dom";
import { usePhoto } from "../hooks/usePhotos";
import { IoCaretBack, IoCaretForward, IoClose } from "react-icons/io5";
import { Masonry } from "@mui/lab";
import LoadingPage from "../components/loading-page";

const PhotoPage = () => {
  const params = useParams();

  if (params.photoId === undefined) return <div>Something went wrong!</div>;

  const { photo } = usePhoto(params.photoId);

  if (photo === undefined) return <LoadingPage />;

  console.log(photo.photoshoot);
  return (
    <div className="w-screen">
      <div className="h-screen md:flex">
        <div className="md:w-1/2 py-8 px-8 flex flex-col items-center justify-center">
          <img className="max-h-full max-w-full" src={photo.mainPhoto} alt="" />
        </div>
        <div className="md:w-1/2 px-20 flex flex-col justify-center items-center">
          <Link
            className="absolute top-0 left-0 p-2 flex items-center bold text-[12px] group"
            to="/"
          >
            <IoCaretBack className="group-hover:scale-0 transition-all" />
            <p className="group-hover:-translate-x-2 transition-all">BACK</p>
          </Link>
          <h1 id="title">{photo.title}</h1>
          <p id="description">{photo.description}</p>
          <a
            href="#photoshoot"
            className="flex items-center semibold mt-5 group"
          >
            <p className="transition-all">VIEW PHOTOSHOOT</p>
            <IoCaretForward className="scale-0 group-hover:scale-100 transition-all" />
          </a>
        </div>
      </div>
      <div id="photoshoot">
        <Masonry className="px-8" columns={{ xs: 1, sm: 2 }} spacing={1}>
          {photo.photoshoot.map((photo, key) => (
            <img key={key} className="w-full h-auto" src={photo.url} />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default PhotoPage;
