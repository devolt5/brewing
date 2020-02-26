import React from "react";
import "./Cup.css";

export default function Cup({ id, quantity, type, active, fillLevel }) {
  return (
    <React.Fragment>
      <div className="cup">
        <p>{"#" + id}</p>
        <p>{quantity > 0 ? quantity : "empty"}</p>
        <p>{type}</p>
        <p>{active ? "active" : ""}</p>
        <p>{fillLevel}</p>
      </div>
    </React.Fragment>
  );
}
