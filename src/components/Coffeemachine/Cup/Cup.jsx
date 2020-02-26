import React from "react";
import "./Cup.css";

export default function Cup({ id, quantity, type, active, fillLevel, status }) {
  return (
    <div className="cup">
      <p>{quantity > 0 ? quantity : "empty"}</p>
      <p>{type}</p>
      <p>{fillLevel}</p>
      <p>{status}</p>
      <p>{active ? "!active!" : ""}</p>
    </div>
  );
}
