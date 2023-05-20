import { useState } from "react";
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { getMovieData } from "../../utils/movie";
import { getPersonFullData } from "../../utils/person";

import {
    selectUserIsSignedIn,
    selectUserLanguage,
    selectTmdbImagesSecureUrl,
} from "../selectors";

import { getUserInfo } from "../../utils/user";

import PageWrapper from "../../layout/PageWrapper";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import Movie from "../../pages/Movie";
import Person from "../../pages/Person";
import Error404 from "../../pages/Error404";
import SetPageLocation from "../../components/SetPageLocation";
import ErrorBoundary from "../../components/ErrorBoundary";

function Router() {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const language = useSelector(selectUserLanguage());
    const imageBaseUrl = useSelector(selectTmdbImagesSecureUrl());

    const [isError, setIsError] = useState(false);

    const privateRouteLoader = () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            return redirect("/login");
        }
        return null;
    };

    class Route {
        constructor(
            page = "",
            path = "",
            element = null,
            loader = null,
            errorElement = false
        ) {
            this.path = path;
            this.element = (
                <>
                    <SetPageLocation page={page} />
                    {element}
                </>
            );
            this.loader = loader;
            this.errorElement = errorElement && <ErrorBoundary page={page} />;
        }
    }

    const ROUTES_DATA = [
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
            element: <Profile />,
            loader: () => privateRouteLoader(),
            errorElement: true,
        },
        {
            page: "dashboard",
            path: "dashboard",
            element: isSignedIn ? <Dashboard /> : <Login />,
            loader: () => privateRouteLoader(),
            errorElement: true,
        },
        {
            page: "movie",
            path: "movies/:id",
            element: <Movie />,
            loader: async ({ params }) => getMovieData(params.id, language),
            errorElement: true,
        },
        {
            page: "person",
            path: "person/:personId",
            element: <Person />,
            errorElement: true,
        },
        {
            page: "error404",
            path: "*",
            element: <Error404 />,
        },
    ];

    const routes = ROUTES_DATA.map(
        (route) =>
            new Route(
                route.page,
                route.path,
                route.element,
                route.loader || null,
                route.errorElement || false
            )
    );

    const router = createBrowserRouter([
        {
            element: <PageWrapper />,
            loader: async () => getUserInfo(setIsError),
            errorElement: <ErrorBoundary page="all" />,
            children: !isError && routes,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
