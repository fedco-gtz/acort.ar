import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const shorten = async () => {
    if (!url.startsWith("http")) {
      toast.error("URL inválida 😕");
      return;
    }

    setLoading(true);

    try {
      let shortLink = null;
      let provider = "";

      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
          )}`
        );

        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents);

        if (data.shorturl) {
          shortLink = data.shorturl;
          provider = "is.gd";
        }
      } catch (e) {
        console.log("is.gd falló, usando fallback...");
      }

      // 🥈 Intento 2: TinyURL
      if (!shortLink) {
        const response = await fetch(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
        );

        const data = await response.text();

        if (data) {
          shortLink = data;
          provider = "tinyurl";
        }
      }

      // ❌ Si ambos fallan
      if (!shortLink) {
        toast.error("No se pudo acortar el link ⚠️");
        return;
      }

      // 💾 Guardar en Firebase
      await addDoc(collection(db, "urls"), {
        originalUrl: url,
        shortUrl: shortLink,
        provider,
        createdAt: serverTimestamp(),
      });

      setShortUrl(shortLink);

    } catch (error) {
      console.error(error);
      toast.error("Error al generar el link 💥");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUrl("");
    setShortUrl("");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Link copiado con éxito 🚀");
    } catch {
      toast.error("No se pudo copiar el link 😢");
    }
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