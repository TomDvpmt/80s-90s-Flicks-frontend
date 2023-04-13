const logout = (navigate) => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    navigate("/login");
};

export default logout;
