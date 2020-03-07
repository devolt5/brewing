import React from "react";
import "./Controlpanel.css";

export default function Controlpanel({ handleSelectIngredients }) {
  return (
    <div className="panel">
      <div className="innerpanel">
        <div
          className="controlbutton coffee"
          onClick={() => handleSelectIngredients("coffee")}
        ></div>
        <div
          className="controlbutton chocolate"
          onClick={() => handleSelectIngredients("chocolate")}
        ></div>
        <div
          className="controlbutton sugar"
          onClick={() => handleSelectIngredients("sugar")}
        ></div>
      </div>
    </div>
  );
}
