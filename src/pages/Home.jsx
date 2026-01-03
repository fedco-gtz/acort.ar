import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

/* Genera códigos tipo: AD947KQ */
const generateCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const randomLetters = (length) =>
    Array.from({ length }, () =>
      letters[Math.floor(Math.random() * letters.length)]
    ).join("");

  const randomNumbers = (length) =>
    Array.from({ length }, () =>
      numbers[Math.floor(Math.random() * numbers.length)]
    ).join("");

  return `${randomLetters(2)}${randomNumbers(3)}${randomLetters(2)}`;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shorten = async () => {
    if (!url.startsWith("http")) {
      alert("URL inválida");
      return;
    }

    const code = generateCode();

    await addDoc(collection(db, "urls"), {
      originalUrl: url,
      code,
      createdAt: new Date(),
    });

    setShortUrl(`${window.location.origin}/${code}`);
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

          <button className="primary" onClick={shorten}>
            Acortar
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
