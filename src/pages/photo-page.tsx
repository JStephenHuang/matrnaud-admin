import {
  IoAdd,
  IoCaretBack,
  IoCaretForward,
  IoCheckmark,
  IoClose,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

import Masonry from "@mui/lab/Masonry";
import { usePhoto } from "../hooks/usePhotos";

const PhotoPage = () => {
  const params = useParams();

  if (params.photoId === undefined) return <div>Something went wrong!</div>;

  const { photo, uploadPhoto, deletePhoto, updatePhoto, onChange } = usePhoto(
    params.photoId
  );

  if (photo === undefined) return <div>Photo does not exist</div>;

  return (
    <div className="w-screen">
      <div className="h-screen flex">
        <div className="w-1/2 py-5 flex flex-col items-center justify-center">
          <img className="max-h-full" src={photo.mainPhoto} alt="" />
        </div>
        <div className="w-1/2 py-20 px-20 flex flex-col">
          <Link
            className="flex items-center font-semibold text-[12px] group"
            to="/"
          >
            <IoCaretBack className="group-hover:scale-0 transition-all" />
            <p className="group-hover:-translate-x-2 transition-all">BACK</p>
          </Link>
          <input
            className="font-bold text-[48px] outline-none"
            type="text"
            value={photo.title}
            onChange={onChange.title}
            placeholder="TITLE..."
          />
          <textarea
            className="resize-none h-[12rem] font-light outline-none"
            value={photo.description}
            onChange={onChange.description}
            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, eum, quisquam nisi veritatis sit ab impedit accusamus quas repellendus ducimus sequi voluptatum. Quo laboriosam obcaecati, expedita earum tempore unde culpa."
          ></textarea>
          <div>
            <p className="font-bold">Popularity:</p>
            <input
              className="w-full font-bold text-[48px] outline-none"
              type="text"
              value={photo.popularity}
              onChange={onChange.popularity}
            />
          </div>

          <a
            href="#photoshoot"
            className="flex items-center font-semibold my-5 group"
          >
            <p className="transition-all">VIEW PHOTOSHOOT</p>
            <IoCaretForward className="scale-0 group-hover:scale-100 transition-all" />
          </a>

          <button
            className="py-2 border border-black hover:text-white hover:bg-black transition-all w-1/3"
            onClick={updatePhoto}
          >
            Save changes
          </button>
        </div>
      </div>
      <div id="photoshoot" className="px-8">
        <Masonry columns={3} spacing={1}>
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
            className="w-full border aspect-square grid place-items-center"
            htmlFor={`dropbox`}
          >
            <IoAdd size={24} />
            <input
              id={`dropbox`}
              type="file"
              className="hidden"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                  uploadPhoto(event.target.files);
                }
              }}
              multiple
            />
          </label>
        </Masonry>
      </div>
    </div>
  );
};

export default PhotoPage;
