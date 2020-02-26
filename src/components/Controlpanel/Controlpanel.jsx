import React from "react";
import "./Controlpanel.css";

export default function Controlpanel({ handleSelectIngredients }) {
  return (
    <div className="panel">
      <button
        className="controlbutton"
        onClick={() => handleSelectIngredients("coffee")}
        type="button"
      >
        Kaffee
      </button>
      <button
        className="controlbutton"
        onClick={() => handleSelectIngredients("chocolate")}
        type="button"
      >
        Schokolade
      </button>
      <button
        className="controlbutton"
        onClick={() => handleSelectIngredients("sugar")}
        type="button"
      >
        Zucker
      </button>
    </div>
  );
}
