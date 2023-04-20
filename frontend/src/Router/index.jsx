import { useEffect } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    // Outlet,
    // ScrollRestoration,
    // useLoaderData,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { TMDB_API_KEY } from "../utils/config";
import { getMovieData } from "../utils/requests";

// import { userSetInfo } from "../services/features/user";
import { tmdbSetConfig } from "../services/features/tmdbConfig";

import {
    selectUserIsSignedIn,
    selectUserLanguage,
} from "../services/utils/selectors";

// import ScrollToHashElement from "../components/ScrollToHashElement";
// import Header from "../layout/Header";
// import Footer from "../layout/Footer";
import RouterWrapper from "../components/RouterWrapper";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Person from "../pages/Person";
import Error404 from "../pages/Error404";
import ErrorBoundary from "../components/ErrorBoundary";

// const RouterWrapper = () => {
//     const token = sessionStorage.getItem("token");
//     const dispatch = useDispatch();
//     const data = useLoaderData();

//     token
//         ? dispatch(userSetInfo(data))
//         : dispatch(
//               userSetInfo({
//                   id: "",
//                   username: "",
//                   firstName: "",
//                   lastName: "",
//                   email: "",
//                   moviesSeen: [""],
//                   moviesToSee: [""],
//                   language: "fr",
//               })
//           );

//     return (
//         <>
//             <ScrollRestoration />
//             <ScrollToHashElement />
//             <Header />
//             <Outlet />
//             <Footer />
//         </>
//     );
// };

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
        const response = await fetch(`/API/users/0`, {
            method: "GET",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        });
        const data = await response.json();
        return data;
    };

    const router = createBrowserRouter([
        {
            element: <RouterWrapper />,
            loader: async () => getUserInfo(),
            errorElement: <ErrorBoundary />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "profile",
                    element: isSignedIn ? <Profile /> : <Login />,
                },
                {
                    path: "dashboard",
                    element: isSignedIn ? <Dashboard /> : <Login />,
                },
                {
                    path: "movies/:id",
                    element: <Movie />,
                    loader: ({ params }) => getMovieData(params.id, language),
                    errorElement: <ErrorBoundary page="movie" />,
                },
                {
                    path: "person/:id",
                    element: <Person />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "*",
                    element: <Error404 />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
