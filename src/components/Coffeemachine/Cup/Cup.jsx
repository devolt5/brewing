import React from "react";
import "./Cup.css";

export default function Cup({ id, quantity, type, active, fillLevel, status }) {
  console.log(active);
  const style = {
    backgroundImage: 'url("cup_ready.svg")'
  };

  return (
    <div className="cup" style={active ? style : {}}>
      {/* <p>{quantity > 0 ? quantity : "empty"}</p> */}
      {type !== null ? <img src={type + ".svg"} /> : ""}
      {/* <p>{fillLevel}</p>
      <p>{status}</p> */}
    </div>
  );
}
