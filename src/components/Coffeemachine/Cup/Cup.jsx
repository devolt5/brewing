import React from "react";
import "./Cup.css";

export default function Cup({ quantity, type, active, handleStartCup }) {
  return (
    <React.Fragment>
      <div className="startButton" onClick={handleStartCup}></div>
      <div className="cup">
        <p>{quantity > 0 ? quantity : "empty"}</p>
        <p>{type}</p>
        <p>{active ? "active" : ""}</p>
      </div>
    </React.Fragment>
  );
}
