import React from "react";
import "./Cup.css";

export default function Cup({ quantity, type }) {
  return (
    <React.Fragment>
      <div className="startButton"></div>
      <div className="cup">
        <p>{quantity > 0 ? quantity : ""}</p>
        <p>{type}</p>
      </div>
    </React.Fragment>
  );
}
