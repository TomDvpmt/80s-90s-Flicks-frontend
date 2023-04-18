import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { TMDB_API_KEY } from "../../utils/config";

import { tmdbSetConfig } from "../../services/features/tmdbConfig";

import { selectUserIsSignedIn } from "../../services/utils/selectors";

import ScrollToHashElement from "../../components/ScrollToHashElement";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Profile from "../../pages/Profile";
import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import Movie from "../../pages/Movie";
import Person from "../../pages/Person";
import Error404 from "../../pages/Error404";

function Router() {
    const isSignedIn = useSelector(selectUserIsSignedIn());
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/configuration?api_key=${TMDB_API_KEY}`,
            { method: "GET" }
        )
            .then((response) => response.json())
            .then((data) => dispatch(tmdbSetConfig(data)))
            .catch((error) => console.error(error));
    }, []);

    return (
        <BrowserRouter>
            <ScrollToHashElement />
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/profile"
                    element={isSignedIn ? <Profile /> : <Login />}
                />
                <Route
                    path="/dashboard"
                    element={isSignedIn ? <Dashboard /> : <Login />}
                />
                <Route path="/" element={<Home />} />
                <Route path="/movies/:id" element={<Movie />} />
                <Route path="/person/:id" element={<Person />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;
