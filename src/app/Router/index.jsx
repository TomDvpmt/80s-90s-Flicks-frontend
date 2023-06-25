import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken } from "../../features/user/userSlice";

import PageWrapper from "../../layout/PageWrapper";
import SetPageLocation from "../../features/navigation/components/SetPageLocation";
import Main from "../../layout/Main";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import Movie from "../../pages/Movie";
import Person from "../../pages/Person";
import Error404 from "../../pages/Error404";
import ErrorBoundary from "../../components/ErrorBoundary";

function Router() {
    const token = useSelector(selectToken);

    const checkAuth = () => {
        if (!token) {
            redirect("/login");
            return null;
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
            loader: () => checkAuth(),
            // errorElement: true,
        },
        {
            page: "dashboard",
            path: "dashboard",
            element: <Dashboard />,
            loader: () => checkAuth(),
            // errorElement: true,
        },
        {
            page: "movie",
            path: "movies/:id",
            element: <Movie />,
            // errorElement: true,
        },
        {
            page: "person",
            path: "person/:personId",
            element: <Person />,
            // errorElement: true,
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
                route.loader || null
                // route.errorElement || false
            )
    );

    const router = createBrowserRouter([
        {
            element: <PageWrapper />,
            errorElement: <ErrorBoundary page="all" />,
            children: [
                {
                    element: <Main />,
                    errorElement: <ErrorBoundary page="all" />,
                    children: routes,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
