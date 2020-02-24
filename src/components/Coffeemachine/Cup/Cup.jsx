import React from "react";
import "./Cup.css";

export default function Cup({ quantity, type }) {
  return (
    <div className="cup">
      <p>{quantity}</p>
      <p>{type}</p>
    </div>
  );
}
