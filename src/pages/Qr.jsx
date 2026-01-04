import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Qr() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQr = async () => {
    if (!text) {
      alert("Ingresá un texto o link");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        text
      )}`;

      await addDoc(collection(db, "qrs"), {
        content: text,
        qrUrl: apiUrl,
        createdAt: serverTimestamp(),
      });

      setQrUrl(apiUrl);
    } catch (error) {
      console.error(error);
      alert("Error al generar el QR");
    } finally {
      setLoading(false);
    }
  };

  const downloadQr = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "codigo-qr.png";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("No se pudo descargar el QR");
    }
  };

  const reset = () => {
    setText("");
    setQrUrl("");
  };

  return (
    <div className="container">
      <h1>Generador de Código QR</h1>
      <h3>Convierte enlaces o texto en códigos QR al instante.</h3>
      <p>
        Pegá un link o escribí un texto y generá un código QR listo para
        descargar y compartir.
      </p>

      {!qrUrl && (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://..."
          />

          <button
            className="primary"
            onClick={generateQr}
            disabled={loading}
          >
            {loading ? "Generando..." : "Generar QR"}
          </button>
        </>
      )}

      {qrUrl && (
        <>
          <div className="qr-wrapper">
            <img src={qrUrl} alt="Código QR generado" />
          </div>

          <div className="divider" />

          <button className="primary" onClick={downloadQr}>
            Descargar QR
          </button>

          <button className="secondary" onClick={reset}>
            Generar otro QR
          </button>
        </>
      )}
    </div>
  );
}
