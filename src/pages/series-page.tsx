import { useSeries } from "../hooks/useSeries";
import { motion } from "framer-motion";
import { IoArrowDownCircle } from "react-icons/io5";

import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import { IFrame } from "../types/series";
import { useCheckout } from "../hooks/useCheckout";

const MainFrames = ({ url, rotate }: { url: string; rotate: string }) => {
  return (
    <div className="w-1/3">
      <img className={`shadow-md ${rotate} transition-all`} src={url} alt="" />
    </div>
  );
};

const Frame = ({
  frame,
  checkout,
}: {
  frame: IFrame;
  checkout: (frame: IFrame) => Promise<void>;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-square flex items-center justify-center">
        <img className="max-w-full max-h-full" src={frame.url} alt="" />
      </div>
      <p className="bold mt-2">{frame.title}</p>
      <p className="">{frame.price}$</p>
      <button
        className="px-4 py-1 bg-black text-white"
        onClick={() => checkout(frame)}
      >
        Buy
      </button>
    </div>
  );
};

const SeriesPage = () => {
  const { series, frames } = useSeries();
  const { checkout } = useCheckout();

  if (series === undefined) return <LoadingPage />;
  if (series === "No matching documents." || typeof series === "string")
    return (
      <div className="w-screen h-screen">
        <header className="h-[9.5%]">
          <Navbar />
        </header>
        <div className="flex flex-col w-full items-center">
          <p className="mt-5 text-[24px]">Series for sale coming soon...</p>
        </div>
      </div>
    );

  const dropIn = {
    hidden: {
      y: "-10vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="w-full h-screen flex flex-col items-center overflow-y-auto pt-[6%]">
      <Navbar />
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        <p className="text-[24px] bold leading-6">MATRNAUD'S SHOP</p>
        <div className="flex items-center my-3">
          <hr className="w-40 border-black" />
          <p className="mx-5 text-[14px]">LIMITED EDITION</p>
          <hr className="w-40 border-black" />
        </div>
      </motion.div>
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        className="w-1/4 flex flex-col items-center py-1 px-[4%] border border-black"
      >
        <p className="bold text-[24px]">{series.title}</p>
        <p className="">
          {series.startDate} - {series.endDate}
        </p>
      </motion.div>

      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center mt-20"
      >
        <a className="flex w-1/2 flex-wrap group" href="#frames">
          <MainFrames
            url={frames[0].url}
            rotate={
              "group-hover:-rotate-12 group-hover:translate-x-[60%] translate-x-full"
            }
          />
          <MainFrames
            url={frames[1].url}
            rotate={"group-hover:-translate-y-5"}
          />
          <MainFrames
            url={frames[2].url}
            rotate={
              "group-hover:rotate-12 group-hover:-translate-x-[60%] -translate-x-full "
            }
          />
        </a>
        <p className="text-center text-[14px] mt-2">{series.title}</p>
        <a href="#frames">
          <IoArrowDownCircle className="animate-bounce mt-2" size={24} />
        </a>
      </motion.div>
      <section id="frames" className="p-5 mt-20">
        <div className="grid grid-cols-4 gap-5">
          {frames.map((frame, key) => (
            <Frame key={key} frame={frame} checkout={checkout} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default SeriesPage;
