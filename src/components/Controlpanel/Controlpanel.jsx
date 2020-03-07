import React from "react";
import "./Controlpanel.css";

export default function Controlpanel({ handleSelectIngredients }) {
  return (
    <div className="panel">
      <div className="innerpanel">
        <div
          className="controlbutton"
          onClick={() => handleSelectIngredients("coffee")}
        >
          Kaffee
        </div>
        <div
          className="controlbutton"
          onClick={() => handleSelectIngredients("chocolate")}
        >
          Schokolade
        </div>
        <div
          className="controlbutton"
          onClick={() => handleSelectIngredients("sugar")}
        >
          Zucker
        </div>
      </div>
    </div>
  );
}
