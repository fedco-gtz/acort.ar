import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../config/firebase";
import logo from "../assets/Logo.png";

export default function Footer() {
    const [totalLinks, setTotalLinks] = useState(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const coll = collection(db, "urls");
                const snapshot = await getCountFromServer(coll);
                setTotalLinks(snapshot.data().count);
            } catch (error) {
                console.error("Error contando links", error);
            }
        };

        fetchCount();
    }, []);

    return (
        <footer className="footer">
            <div className="footer-inner">
                <h2>
                    Olvidate de los links larguísimos. <br />
                    Usá el acortador más confiable de Argentina.
                </h2>

                <div className="stats">
                    <div className="stat">
                        <span className="label">Links creados</span>
                        <span className="value">
                            {totalLinks !== null ? `${totalLinks}` : "—"}
                        </span>
                    </div>

                    <div className="divider-vertical" />

                    <div className="stat logo">
                        <img src={logo} alt="Acort.AR" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
