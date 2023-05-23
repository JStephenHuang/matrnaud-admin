import { Link, useParams } from "react-router-dom";
import { useSeries } from "../hooks/useSeries";
import { IoCheckmark } from "react-icons/io5";
import { Masonry } from "@mui/lab";

const SeriesPage = () => {
  const params = useParams();

  const seriesId = params.seriesId;

  if (seriesId === undefined) return <div>Something went wrong!</div>;

  const { series, frames, updateSeries, uploadFrame, deleteFrame, onChange } =
    useSeries(seriesId);

  if (series === undefined) return <div>Photo does not exist.</div>;

  return (
    <div>
      <div className="flex flex-col border-b border-black">
        <Link to="/series">Back</Link>
        id: {seriesId}
      </div>

      <div className="flex flex-col items-center mt-10">
        <div className=" w-fit flex flex-col items-center py-2 px-[4%] border border-black">
          <input
            className="font-bold text-center text-[28px] outline-none my-2"
            type="text"
            value={series.title}
            onChange={onChange.title}
            placeholder="TITLE..."
          />
          <div className="flex items-center justify-center">
            <input
              className="text-center w-1/6 text-[20px] outline-none"
              type="text"
              value={series.startDate}
              onChange={onChange.startDate}
              placeholder="Start Date..."
            />
            -
            <input
              className="text-center w-1/6 text-[20px] outline-none"
              type="text"
              value={series.endDate}
              onChange={onChange.endDate}
              placeholder="End Date..."
            />
          </div>
        </div>
        <input
          type="checkbox"
          id="checkbox-active"
          checked={series.active}
          onChange={onChange.active}
          className="hidden"
        />
        <p className="font-bold mt-3">Active:</p>

        <div>
          <label
            htmlFor="checkbox-active"
            className="w-[5rem] aspect-square border border-black grid place-content-center"
          >
            {series.active ? <IoCheckmark size={32} /> : null}
          </label>
        </div>

        <button
          className="rounded-md py-2 px-4 bg-black text-white mt-3"
          onClick={updateSeries}
        >
          Save
        </button>
        <Masonry columns={4} spacing={1}>
          {frames.map((frame, key) => (
            <div key={key}>
              <img src={frame.url} alt="" />
              <div className="flex items-center my-2">
                <Link
                  className="rounded-md py-2 px-4 bg-black text-white mr-2"
                  to={`/series/${seriesId}/${frame.id}`}
                >
                  edit
                </Link>
                <button
                  className="rounded-md py-2 px-4 bg-red-500 text-white"
                  onClick={() => deleteFrame(frame.id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
          <input
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) uploadFrame(event.target.files[0]);
            }}
          />
        </Masonry>
      </div>
    </div>
  );
};

export default SeriesPage;
