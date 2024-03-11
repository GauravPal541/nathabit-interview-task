import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "./components/layout/Loading";
import Layout from "./components/layout/Layout";
import Movies from "./components/main/movies/Movies";
import Favourite from "./components/main/movies/Favourite";

const Login = lazy(() => import("./components/main/login/Login"));
const Register = lazy(() => import("./components/main/login/Register"));

export default createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<Loading />}>
                <Register />
            </Suspense>
        ),
    },
    {
        path:"/app",
        element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: <h1>Dashboard</h1>
          },
          {
            path: "movies",
            element: <Movies/>
          },
          {
            path: "favourite",
            element: <Favourite/>
          }
        ],
      },
]);
