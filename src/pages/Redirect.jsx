import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Redirect() {
  const { code } = useParams();

  useEffect(() => {
    const go = async () => {
      try {
        const q = query(
          collection(db, "urls"),
          where("code", "==", code)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          window.location.href = data.originalUrl;
        } else {
          alert("URL no encontrada");
        }
      } catch (error) {
        console.error(error);
        alert("Error al redirigir");
      }
    };

    go();
  }, [code]);

  return <p>Redirigiendo...</p>;
}
