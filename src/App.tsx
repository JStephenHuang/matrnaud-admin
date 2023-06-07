import FramePage from "./pages/frame-page";
import InfoPage from "./pages/info";
import LoginPage from "./pages/login-page";
import MainPage from "./pages/main-page";
import PhotoPage from "./pages/photo-page";
import { RouterProvider } from "react-router-dom";
import SeriesArrayPage from "./pages/series-array-page";
import SeriesPage from "./pages/series-page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "info",
    element: <InfoPage />,
  },
  {
    path: "/photo/:photoId",
    element: <PhotoPage />,
  },
  {
    path: "/series",
    element: <SeriesArrayPage />,
  },
  {
    path: "/series/:seriesId",
    element: <SeriesPage />,
  },
  {
    path: "/series/:seriesId/:frameId",
    element: <FramePage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
