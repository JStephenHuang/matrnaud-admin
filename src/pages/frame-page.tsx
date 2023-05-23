import { useParams, Link } from "react-router-dom";
import { useFrame } from "../hooks/useSeries";

const FramePage = () => {
  const params = useParams();

  const frameId = params.frameId;
  const seriesId = params.seriesId;

  if (frameId === undefined || seriesId === undefined)
    return <div>Something went wrong!</div>;

  const { frame, updateFrame, onChange } = useFrame(frameId);

  if (frame === undefined) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col border-b border-black">
        <Link to={`/series/${seriesId}`}>Back</Link>
        id: {frameId}
      </div>
      <div className="flex flex-col items-center mt-10">
        <div className="w-1/4">
          <img className="max-w-full max-h-full" src={frame.url} alt="" />
        </div>
        <input
          type="text"
          className="text-[32px] font-bold text-center outline-none"
          value={frame.title}
          onChange={onChange.title}
          placeholder="TITLE..."
        />
        <input
          type="text"
          className="text-[24px] font-bold text-center outline-none"
          value={frame.price}
          onChange={onChange.price}
          placeholder="$$$"
        />
        <button
          className="py-2 border border-black hover:text-white hover:bg-black transition-all w-1/5"
          onClick={updateFrame}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default FramePage;
