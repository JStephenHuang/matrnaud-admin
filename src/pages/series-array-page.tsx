import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Navbar from "../components/navbar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useSeriesArray } from "../hooks/useSeries";

const SeriesArrayPage = () => {
  const { seriesArray, createSeries, deleteSeries } = useSeriesArray();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      const authState = await isAuthenticated();
      if (!authState) {
        navigate("/login");
      }
    })();
  }, [document.cookie]);

  return (
    <div>
      <Navbar />
      <div className="p-10">
        {seriesArray.map((series, key) => (
          <div key={key} className="border p-5 my-2">
            <div className="flex items-center justify-between">
              <p className="text-[24px] font-bold">{series.title}</p>
              {series.active ? (
                <div className="flex items-center">
                  <p className="mr-2">Active</p>
                  <div className="w-3 h-3 bg-green-500 rounded-full"> </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="mr-2">Passive</p>
                  <div className="w-3 h-3 bg-red-500 rounded-full"> </div>
                </div>
              )}
            </div>
            <div className="flex">
              {series.startDate} - {series.endDate}
            </div>
            <div>id: {series.id}</div>
            <div className="flex justify-between">
              <Link
                to={`/series/${series.id}`}
                className="py-2 px-4 rounded-md bg-black text-white"
              >
                edit
              </Link>
              <button
                className="py-2 px-4 rounded-md bg-red-500 text-white"
                onClick={() => deleteSeries(series.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
        <button
          className="rounded-md py-2 px-4 bg-black text-white"
          onClick={createSeries}
        >
          Create a series
        </button>
      </div>
    </div>
  );
};

export default SeriesArrayPage;
