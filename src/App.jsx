// Dependency
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Layout
import AppLayout from "./layout/AppLayout";
// Pages
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import SingleGif from "./pages/SingleGif";
import Favourites from "./pages/Favourites";
// Context
import GifProvider from "./context/GifContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
      {
        path: "/favorites",
        element: <Favourites />,
      },
    ],
  },
]);

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
