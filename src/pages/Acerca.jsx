import React, { useState } from "react";
import preguntasFrecuentes from "../data/preguntas.json";

const Acerca = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const togglePregunta = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="container">
        <h1>Acerca de nuestra página</h1>
        <div className="faq-list">
          {preguntasFrecuentes.map((item, index) => (
            <div className="faq-item" key={index}>
              <button onClick={() => togglePregunta(index)}>
                <span>{item.pregunta}</span>
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="answer">
                  <p>{item.respuesta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Acerca;
