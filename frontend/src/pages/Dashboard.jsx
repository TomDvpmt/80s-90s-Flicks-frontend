import { useEffect } from "react";

import store from "../utils/store";
import { pageSetType } from "../features/page";

const Dashboard = () => {
    useEffect(() => {
        store.dispatch(pageSetType("dashboard"));
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
