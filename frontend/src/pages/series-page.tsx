import { useSeries } from "../hooks/useSeries";
import { motion } from "framer-motion";

import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import { useState } from "react";

const MainFrames = ({ url, rotate }: { url: string; rotate: string }) => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <img
        className={`w-1/5 absolute shadow-md ${rotate} -z-[${index}]`}
        src={url}
        onClick={() =>
          setIndex((count) => {
            return count + 1;
          })
        }
        alt=""
      />
    </div>
  );
};

const SeriesPage = () => {
  const { series, frames } = useSeries();

  if (series === undefined) return <LoadingPage />;
  if (series === "No matching documents.")
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
  if (typeof series !== "string")
    return (
      <div className="w-full h-screen">
        <header className="h-[9.5%]">
          <Navbar />
        </header>

        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <p className="text-[28px] bold leading-6 mt-5">MATRNAUD'S SHOP</p>
          <div className="flex items-center my-3">
            <hr className="w-40 border-black" />
            <p className="mx-5 text-[14px]">LIMITED EDITION</p>
            <hr className="w-40 border-black" />
          </div>
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center py-2 px-[4%] border border-black"
          >
            <p className="bold text-[28px]">{series.title}</p>
            <p className="">
              {series.startDate} - {series.endDate}
            </p>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <MainFrames url={frames[0].url} rotate={"-rotate-12"} />
            <MainFrames url={frames[1].url} rotate={""} />
            <MainFrames url={frames[2].url} rotate={"rotate-12"} />
          </div>
        </div>
      </div>
    );
};
export default SeriesPage;
