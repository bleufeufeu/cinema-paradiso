import App from "./App";
import Home from "./components/Home/Home";
import MoviePage from "./components/MoviePage/MoviePage";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/movies/",
        element: <Shop />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/movies/:movieId",
        element: <MoviePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];

export default routes;
