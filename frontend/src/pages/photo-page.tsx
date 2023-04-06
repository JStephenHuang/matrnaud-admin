import { useParams, Link } from "react-router-dom";
import { usePhoto } from "../hooks/usePhotos";
import { IoCaretBack, IoCaretForward, IoClose } from "react-icons/io5";

const PhotoPage = () => {
  const params = useParams();

  if (params.photoId === undefined) return <div>Something went wrong!</div>;

  const { photo, uploadPhoto, deletePhoto } = usePhoto(params.photoId);

  if (photo === undefined) return <div>Photo does not exist</div>;

  console.log(photo.photoshoot);
  return (
    <div className="w-screen">
      <div className="flex">
        <div className="w-1/2">
          <img className="w-full h-auto" src={photo.mainPhoto} alt="" />
        </div>
        <div className="w-1/2 px-20 py-20 flex flex-col">
          <Link className="flex items-center semibold text-[12px] group" to="/">
            <IoCaretBack className="group-hover:scale-0 transition-all" />
            <p className="group-hover:-translate-x-2 transition-all">BACK</p>
          </Link>
          <h1 id="title">TITLE</h1>
          <p id="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
            necessitatibus libero nobis ipsam quod numquam quidem enim
            laboriosam, earum sed in? Quo culpa officiis illum debitis sapiente
            nulla inventore ea.
          </p>
          <a
            href="#photoshoot"
            className="flex items-center semibold mt-10 group"
          >
            <p className="transition-all">VIEW PHOTOSHOOT</p>
            <IoCaretForward className="scale-0 group-hover:scale-100 transition-all" />
          </a>
        </div>
      </div>
      <div id="photoshoot" className="columns-4 mt-4">
        {photo.photoshoot.map((photo, key) => (
          <div id="gallery-photo" key={key}>
            <button
              onClick={() => deletePhoto(photo.id)}
              className="absolute z-10"
            >
              <IoClose
                className="m-2 rounded-full bg-yellow-300 text-white"
                size={12}
              />
            </button>
            <img className="w-full h-auto" src={photo.url} />
          </div>
        ))}
        <label
          className="w-full aspect-square border text-gray-400 rounded-sm grid place-items-center"
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
    </div>
  );
};

export default PhotoPage;
