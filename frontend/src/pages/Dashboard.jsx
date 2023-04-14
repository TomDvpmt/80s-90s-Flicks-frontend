import { useEffect } from "react";

import { setUserInfo } from "../utils/requests";

const Dashboard = () => {
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setUserInfo(token);
        // to add : handle request error
    }, []);
    return (
        <>
            <main>
                <h1>Tableau de bord</h1>
            </main>
            <nav>
                <ul>
                    <li>
                        <h2>À voir</h2>
                    </li>
                    <li>
                        <h2>Déjà vus</h2>
                    </li>
                    <li>
                        <h2>J'aime</h2>
                    </li>
                    <li>
                        <h2>Mes critiques</h2>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Dashboard;
