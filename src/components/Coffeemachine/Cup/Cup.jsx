import React, { useState } from "react";
import "./Cup.css";

export default function Cup({ id, quantity, type, active, running }) {
  //const [finished, setFinished] = useState(false);
  //const [overflow, setOverflow] = useState(false);

  return (
    <React.Fragment>
      <div className="cup">
        <p>{"#" + id}</p>
        <p>{quantity > 0 ? quantity : "empty"}</p>
        <p>{type}</p>
        <p>{active ? "active" : ""}</p>
        <p>{running ? "running" : ""}</p>
      </div>
    </React.Fragment>
  );
}
