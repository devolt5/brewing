import React from "react";
import "./Cup.css";

export default function Cup({ id, quantity, type, active, fillLevel, status }) {
  const style = {
    backgroundImage: 'url("cup_ready.svg")'
  };

  //current stage: 15; current height: 78px; 78/14 = 5.5px per stage

  return (
    <div className="cup" style={active ? style : {}}>
      {/* <p>{quantity > 0 ? quantity : "empty"}</p> */}
      {type !== null ? <img src={type + ".svg"} /> : ""}
      {/* <p>{fillLevel}</p>
      <p>{status}</p> */}
      {active ? (
        ""
      ) : (
        <div>
          {status === "running" || status === "finished" ? (
            <div className="spurt"></div>
          ) : (
            ""
          )}
          <div className="liquid" style={{ height: fillLevel * 6 }}></div>
        </div>
      )}
    </div>
  );
}
