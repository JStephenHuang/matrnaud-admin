import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/main-page";
import PhotoPage from "./pages/photo-page";
import SeriesArrayPage from "./pages/series-array-page";
import SeriesPage from "./pages/series-page";
import FramePage from "./pages/frame-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/series" element={<SeriesArrayPage />}></Route>
      <Route path="/series/:seriesId" element={<SeriesPage />}></Route>
      <Route path="/series/:seriesId/:frameId" element={<FramePage />}></Route>
      <Route path="/photo/:photoId" element={<PhotoPage />} />
    </Routes>
  );
};

export default App;
