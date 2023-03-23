const logout = (navigate) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
};

export default logout;
