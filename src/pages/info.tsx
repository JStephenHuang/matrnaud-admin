import Navbar from "../components/navbar";
import { useInfo } from "../hooks/useInfo";

const InfoPage = () => {
  const {
    bio,
    bookingDescription,
    updateInfo,
    onBioChange,
    onBookingDescriptionChange,
  } = useInfo();

  if (bio === undefined || bookingDescription === undefined)
    return <div>Loading</div>;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-5">
        <p className="font-bold text-[24px]">BIO</p>
        <textarea
          className="resize-none outline-none h-[15rem] w-1/2 font-light border"
          value={bio}
          onChange={onBioChange}
          placeholder="bio..."
        ></textarea>
        <p className="font-bold text-[24px] mt-5">BOOKING DESCRIPTION</p>
        <textarea
          className="resize-none outline-none h-[15rem] w-1/2 font-light border"
          value={bookingDescription}
          onChange={onBookingDescriptionChange}
          placeholder="booking description..."
        ></textarea>
        <button
          className="py-2 border border-black hover:text-white hover:bg-black transition-all w-1/3 mt-10"
          onClick={updateInfo}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default InfoPage;
