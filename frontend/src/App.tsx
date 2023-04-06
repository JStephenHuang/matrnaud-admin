import { Routes, Route } from "react-router-dom";

// * Components

import MainPage from "./pages/main-page";
import PhotoPage from "./pages/photo-page";
import BookingPage from "./pages/booking-page";
import ShopPage from "./pages/shop-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/photo/:photoId" element={<PhotoPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/bookings" element={<BookingPage />} />
    </Routes>
  );
};

export default App;
