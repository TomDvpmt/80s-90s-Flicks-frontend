import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Person from "./pages/Person";
import Error404 from "./pages/Error404";

function Router() {
    fetch(
        `https://api.themoviedb.org/3/configuration?api_key=2d0a75daa1b16703efb5d87960c9e67e`,
        { method: "GET" }
    )
        .then((response) => response.json())
        .then((data) => console.log("TMDB config : ", data))
        .catch((error) => console.error(error));

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
