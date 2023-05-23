import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFrame, ISeries } from "../types/series";
import { backend } from "../helper/backend";

export const useSeriesArray = () => {
  const navigate = useNavigate();

  const [seriesArray, setSeriesArray] = useState<ISeries[]>([]);

  const createSeries = async () => {
    const res = await backend
      .post("/series")
      .catch((error) => console.log(error));

    if (res) navigate(`/series/${res.data}`);
  };

  const deleteSeries = async (seriesId: string) => {
    const res = await backend
      .delete(`/series/${seriesId}`)
      .catch((error) => console.log(error));

    if (res) setSeriesArray(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await backend
        .get("/series")
        .catch((error) => console.log(error));

      if (res) setSeriesArray(res.data);
    })();
  }, []);

  return { seriesArray, createSeries, deleteSeries };
};

export const useSeries = (seriesId: string) => {
  const [series, setSeries] = useState<ISeries>();
  const [frames, setFrames] = useState<IFrame[]>([]);

  const uploadFrame = async (file: File) => {
    const form = new FormData();
    form.append("photo", file);

    const res = await backend
      .post(`/frames/${seriesId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error) => console.log(error));

    if (res) {
      setFrames(res.data);
      console.log(res.data);
    }
  };

  const deleteFrame = async (frameId: string) => {
    const res = await backend
      .delete(`/frames/${frameId}`)
      .catch((error) => console.log(error));

    if (res) setFrames(res.data);
  };

  const updateSeries = async () => {
    const res = await backend
      .put(`/series/${seriesId}`, { series: series })
      .catch((error) => console.log(error));

    if (res) setSeries(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await backend
        .get(`/series/${seriesId}`)
        .catch((error) => console.log(error));

      if (res) {
        setSeries(res.data.series);
        setFrames(res.data.frames);
      }
    })();
  }, []);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (series === undefined) return;
    setSeries({ ...series, title: event.target.value });
  };

  const startDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (series === undefined) return;
    setSeries({ ...series, startDate: event.target.value });
  };

  const endDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (series === undefined) return;
    setSeries({ ...series, endDate: event.target.value });
  };

  const onActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (series === undefined) return;
    setSeries({ ...series, active: event.target.checked });
  };

  const onChange = {
    title: onTitleChange,
    startDate: startDateChange,
    endDate: endDateChange,
    active: onActiveChange,
  };

  return { series, frames, updateSeries, uploadFrame, deleteFrame, onChange };
};

export const useFrame = (frameId: string) => {
  const [frame, setFrame] = useState<IFrame>();

  const updateFrame = async () => {
    const res = await backend
      .put(`/frames/${frameId}`, { frame: frame })
      .catch((error) => console.log(error));

    if (res) setFrame(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await backend
        .get(`/frames/${frameId}`)
        .catch((error) => console.log(error));

      if (res) setFrame(res.data);
    })();
  }, []);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (frame === undefined) return;
    setFrame({ ...frame, title: event.target.value });
  };

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (frame === undefined) return;
    setFrame({ ...frame, price: event.target.value });
  };

  const onChange = {
    title: onTitleChange,
    price: onPriceChange,
  };

  return { frame, onChange, updateFrame };
};
