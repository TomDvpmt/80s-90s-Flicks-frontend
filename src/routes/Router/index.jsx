import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
    auth,
    selectUserIsSignedIn,
    selectUserToken,
} from "../../features/userSlice";
import { tmdbSetConfig } from "../../features/configSlice";

import { TMDB_BASE_URI, TMDB_API_KEY } from "../../config/APIs";
import { getToken, getUserInfo } from "../../utils/user";

import PageWrapper from "../../layout/PageWrapper";
import SetPageLocation from "../../components/SetPageLocation";
import Main from "../../layout/Main";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import HomeFilters from "../../components/filters/HomeFilters";
import Movie from "../../pages/Movie";
import Person from "../../pages/Person";
import Loader from "../../components/Loader";
import Error404 from "../../pages/Error404";
import ErrorBoundary from "../../components/ErrorBoundary";

function Router() {
    const isSignedIn = useSelector(selectUserIsSignedIn);
    const token = useSelector(selectUserToken);
    const dispatch = useDispatch();

    const setTmdbConfig = () => {
        fetch(`${TMDB_BASE_URI}/configuration?api_key=${TMDB_API_KEY}`)
            .then((response) => response.json())
            .then((data) => dispatch(tmdbSetConfig(data)))
            .catch((error) => console.error(error));
    };

    const privateRouteLoader = () => {
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

    const routesData = [
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

    const routes = routesData.map(
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
            errorElement: <ErrorBoundary page="all" />,
            children: [
                {
                    element: <Main />,
                    loader: async () => {
                        setTmdbConfig();
                        const token = await getToken();
                        dispatch(auth(token));
                        const userData = token ? await getUserInfo() : {};
                        return userData;
                    },
                    errorElement: <ErrorBoundary page="all" />,
                    children: routes,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
