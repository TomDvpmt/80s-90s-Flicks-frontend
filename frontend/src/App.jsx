import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";

function App() {
    fetch(
        `https://api.themoviedb.org/3/configuration?api_key=2d0a75daa1b16703efb5d87960c9e67e`,
        { method: "GET" }
    )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/movies/:id" element={<Movie />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
