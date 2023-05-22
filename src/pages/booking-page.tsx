import { motion } from "framer-motion";
import { useEmail } from "../hooks/useEmail";

import Navbar from "../components/navbar";

const BookingPage = () => {
  const { sendEmail, form, onChange, error } = useEmail();

  return (
    <div className="h-screen">
      <header className="h-[9.5%]">
        <Navbar />
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ delay: 0.2 }}
        className="w-full md:flex px-3"
      >
        <div className="px-10 md:w-1/2 my-5 flex flex-col regular">
          <p className="md:text-[28px] text-[18px] semibold">
            Book a photoshoot with me.
          </p>
          <p className="mb-5 text-[12px] md:text-[16px]">
            If you want me to take pictures and portraits for you. Enter you
            email, you name and the date of when you're planning to do it. Of
            course it's not guaranteed if I will be able to shoot at the date
            you chose.
          </p>
          {error === "Form not filled" && (
            <p className="text-center text-red-500">Form not filled</p>
          )}

          {error === "Email not sent." && (
            <p className="text-center text-red-500">Email not sent</p>
          )}
          {error === "Email not valid." && (
            <p className="text-center text-red-500">Email's format not valid</p>
          )}
          {error === "Email sent." && (
            <p className="text-center text-green-500">Email sent</p>
          )}
          <input
            className="py-2 border-b focus:border-black outline-none mb-5 transition-all"
            type="text"
            value={form.email}
            onChange={onChange.email}
            placeholder="Email"
          />
          <input
            className="py-2 border-b focus:border-black outline-none mb-5 transition-all"
            type="text"
            value={form.name}
            onChange={onChange.name}
            placeholder="Name"
          />

          <textarea
            className="py-2 border-b h-[8rem] focus:border-black outline-none resize-none mb-5 transition-all"
            value={form.message}
            onChange={onChange.message}
            placeholder="Message..."
          ></textarea>

          <button
            onClick={sendEmail}
            className="bg-black medium text-white px-5 py-2 hover:opacity-50 transition-all"
          >
            Submit
          </button>
        </div>
        <div className="px-10 md:px-0 md:w-1/2">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 0.4 }}
            className="w-full h-auto"
            src="https://monde.ccdmd.qc.ca/media/image1024/136372.jpg"
            alt=""
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BookingPage;
