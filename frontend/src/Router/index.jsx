import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { TMDB_API_KEY } from "../utils/config";
import { getMovieData } from "../utils/movie";
import { getPersonFullData } from "../utils/person";

import { tmdbSetConfig } from "../services/features/tmdbConfig";

import {
    selectUserIsSignedIn,
    selectUserLanguage,
} from "../services/utils/selectors";

import PageWrapper from "../layout/PageWrapper";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Person from "../pages/Person";
import Error404 from "../pages/Error404";
import SetPage from "../components/SetPage";
import ErrorBoundary from "../components/ErrorBoundary";

function Router() {
    const token = sessionStorage.getItem("token");
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const language = useSelector(selectUserLanguage());
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/configuration?api_key=${TMDB_API_KEY}`,
            { method: "GET" }
        )
            .then((response) => response.json())
            .then((data) => dispatch(tmdbSetConfig(data)))
            .catch((error) => console.error(error));
    }, [dispatch]);

    const getUserInfo = async () => {
        if (token) {
            const response = await fetch(`/API/users/0`, {
                method: "GET",
                headers: {
                    Authorization: `BEARER ${token}`,
                },
            });
            const data = await response.json();
            return data;
        }
        return {};
    };

    const routes = [
        {
            page: "home",
            path: "/",
            element: <Home />,
        },
        {
            page: "register",
            path: "register",
            element: <Register />,
        },
        {
            page: "login",
            path: "login",
            element: <Login />,
        },
        {
            page: "profile",
            path: "profile",
            element: isSignedIn ? <Profile /> : <Login />,
        },
        {
            page: "dashboard",
            path: "dashboard",
            element: isSignedIn ? <Dashboard /> : <Login />,
        },
        {
            page: "movie",
            path: "movies/:id",
            element: <Movie />,
            loader: ({ params }) => getMovieData(params.id, language),
            errorElement: true,
        },
        {
            page: "person",
            path: "person/:id",
            element: <Person />,
            loader: async ({ params }) =>
                getPersonFullData(params.id, language),
            errorElement: true,
        },
        {
            page: "error404",
            path: "*",
            element: <Error404 />,
        },
    ];

    const router = createBrowserRouter([
        {
            element: <PageWrapper />,
            loader: async () => getUserInfo(),
            errorElement: <ErrorBoundary />,
            children: routes.map((route) => ({
                path: route.path,
                element: (
                    <>
                        <SetPage page={route.page} />
                        {route.element}
                    </>
                ),
                loader: route.loader,
                errorElement: route.errorElement && (
                    <ErrorBoundary page={route.page} />
                ),
            })),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
