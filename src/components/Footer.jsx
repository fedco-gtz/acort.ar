import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";
import logo from "../assets/Logo.png";

export default function Footer() {
  const [linksCount, setLinksCount] = useState(null);
  const [qrsCount, setQrsCount] = useState(null);

  const animatedLinks = useAnimatedCounter(linksCount);
  const animatedQrs = useAnimatedCounter(qrsCount);

  useEffect(() => {
    const unsubLinks = onSnapshot(collection(db, "urls"), (snap) => {
      setLinksCount(snap.size);
    });

    const unsubQrs = onSnapshot(collection(db, "qrs"), (snap) => {
      setQrsCount(snap.size);
    });

    return () => {
      unsubLinks();
      unsubQrs();
    };
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
              {linksCount === null ? "—" : animatedLinks}
            </span>
          </div>

          <div className="divider-vertical" />

          <div className="stat">
            <span className="label">QR's creados</span>
            <span className="value">
              {qrsCount === null ? "—" : animatedQrs}
            </span>
          </div>

          <div className="divider-vertical" />

          <div className="footer-logo">
            <img src={logo} alt="Acort.AR" />
          </div>
        </div>
      </div>
    </footer>
  );
}
