import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const shorten = async () => {
    if (!url.startsWith("http")) {
      alert("URL inválida");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Llamada a la API de is.gd
      const response = await fetch(
        `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
      );

      const data = await response.json();

      if (!data.shorturl) {
        alert("No se pudo acortar el link");
        return;
      }

      // 2️⃣ Guardar en Firestore
      await addDoc(collection(db, "urls"), {
        originalUrl: url,
        shortUrl: data.shorturl,
        provider: "is.gd",
        createdAt: serverTimestamp(),
      });

      // 3️⃣ Mostrar resultado
      setShortUrl(data.shorturl);
    } catch (error) {
      console.error(error);
      alert("Error al generar el link");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUrl("");
    setShortUrl("");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert("Link copiado ✅");
  };

  return (
    <div className="container">
      <h1>Acortador de URLs</h1>
      <h3>Optimiza tus enlaces para redes sociales sin costo.</h3>
      <p>
        Simplifica tu presencia digital. Convierte URLs largas en enlaces
        perfectos para compartir en todas tus redes. Gratis, rápido y
        profesional.
      </p>

      {!shortUrl && (
        <>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />

          <button
            className="primary"
            onClick={shorten}
            disabled={loading}
          >
            {loading ? "Acortando..." : "Acortar"}
          </button>
        </>
      )}

      {shortUrl && (
        <>
          <div className="result">
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>

          <div className="divider" />

          <button className="primary" onClick={copyLink}>
            Copiar link creado
          </button>

          <button className="secondary" onClick={reset}>
            Acortar otro link
          </button>
        </>
      )}
    </div>
  );
}
