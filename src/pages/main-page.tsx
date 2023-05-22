import { Link } from "react-router-dom";
import { usePhotos } from "../hooks/usePhotos";
import { IPhoto } from "../types/photo";
import { motion } from "framer-motion";

import Navbar from "../components/navbar";
import Masonry from "@mui/lab/Masonry";
import Footer from "../components/footer";

const Photo = ({ photo }: { photo: IPhoto }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: photo.popularity }}
      id="gallery-items"
    >
      <Link to={`/photo/${photo.id}`}>
        <img
          className="hover:opacity-90 transition-all w-full h-auto"
          src={photo.mainPhoto}
        />
      </Link>
    </motion.div>
  );
};

const Gallery = () => {
  const { photos } = usePhotos();

  if (photos === undefined || photos.length === 0) return <div>Loading</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: 0.2 }}
      className="flex flex-col"
    >
      <div className="pl-2">
        <Masonry columns={{ xs: 2, sm: 4 }} spacing={1}>
          {photos.map((photo, key) => (
            <Photo key={key} photo={photo} />
          ))}
        </Masonry>
      </div>

      <Footer />
    </motion.div>
  );
};

const MainPage = () => {
  return (
    <div className="h-screen">
      <header className="h-[9%]">
        <Navbar />
      </header>
      <Gallery />
    </div>
  );
};

export default MainPage;
