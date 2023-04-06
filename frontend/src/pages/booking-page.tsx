import { m, motion } from "framer-motion";
import { useEmail } from "../hooks/useEmail";
import { useRef } from "react";

import Navbar from "../components/navbar";

const BookingPage = () => {
  const emailFromInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageFromInputRef = useRef<HTMLTextAreaElement>(null);

  const { sendEmail } = useEmail();

  const onSumbit = () => {
    if (
      !emailFromInputRef.current ||
      !nameInputRef.current ||
      !messageFromInputRef.current
    )
      return console.log("something went wrong");

    const emailFrom = emailFromInputRef.current.value;
    const name = nameInputRef.current.value;
    const message = messageFromInputRef.current.value;

    if (emailFrom === "" || name === "" || message === "")
      return console.log("form not filled");

    sendEmail(emailFrom, name, message);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: 0.2 }}
      className="h-screen"
    >
      <header className="h-[9.5%]">
        <Navbar />
      </header>

      <div className="w-full flex">
        <div className="px-10 w-1/2 my-5 flex flex-col text-[20px] regular">
          <p className="text-[40px] semibold">Book a photoshoot with me.</p>
          <p className="mb-5 text-[16px]">
            If you want me to take pictures and portraits for you. Enter you
            email, you name and the date of when you're planning to do it. Of
            course it's not guaranteed if I will be able to shoot at the date
            you chose, but message me for more.
          </p>
          <input
            className="py-2 border-b-2 focus:border-black outline-none mb-5 transition-all"
            type="text"
            placeholder="Email"
            ref={emailFromInputRef}
          />
          <input
            className="py-2 border-b-2 focus:border-black outline-none mb-5 transition-all"
            type="text"
            placeholder="Name"
            ref={nameInputRef}
          />

          <textarea
            className="py-2 border-b-2 h-[10rem] focus:border-black outline-none resize-none mb-5 transition-all"
            placeholder="Message..."
            ref={messageFromInputRef}
          ></textarea>
          <button
            onClick={onSumbit}
            className="bg-black medium text-white px-5 py-2 hover:opacity-50"
          >
            Submit
          </button>
        </div>
        <div className="w-1/2">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 0.4 }}
            className="w-full h-auto"
            src="http://monde.ccdmd.qc.ca/media/image1024/136372.jpg"
            alt=""
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BookingPage;
