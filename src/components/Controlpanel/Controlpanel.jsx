import React from "react";
import "./Controlpanel.css";

export default function Controlpanel({ handleClick }) {
  return (
    <div className="panel">
      <button
        className="controlbutton"
        onClick={() => handleClick("coffee")}
        type="button"
      >
        Kaffee
      </button>
      <button
        className="controlbutton"
        onClick={() => handleClick("chocolate")}
        type="button"
      >
        Schokolade
      </button>
      <button
        className="controlbutton"
        onClick={() => handleClick("sugar")}
        type="button"
      >
        Zucker
      </button>
    </div>
  );
}
