import { Routes, Route } from "react-router-dom";

// * Components

import MainPage from "./pages/main-page";
import PhotoPage from "./pages/photo-page";
import BookingPage from "./pages/booking-page";
import SeriesPage from "./pages/series-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/photo/:photoId" element={<PhotoPage />} />
      <Route path="/shop" element={<SeriesPage />} />
      <Route path="/bookings" element={<BookingPage />} />
    </Routes>
  );
};

export default App;
