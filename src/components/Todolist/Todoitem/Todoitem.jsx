import React from "react";
import "./Todoitem.css";

export default function Todoitem({ quantity, type }) {
  return (
    <React.Fragment>
      <div className="item">
        <div>
          <p>{quantity}</p>
          <p>{type}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
