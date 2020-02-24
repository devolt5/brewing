import React, { useState } from "react";
import "./Cup.css";

export default function Cup({
  id,
  quantity,
  type,
  active,
  running,
  handleStartCup
}) {
  //const [finished, setFinished] = useState(false);
  //const [overflow, setOverflow] = useState(false);

  let finished = false;
  let overflow = false;

  //FIXME migrate to upper component, because of re-render problems!!!
  if (running) {
    let fillLevel = 0;
    let interval = setInterval(() => {
      console.log("sec von " + id + " mit filling " + fillLevel);
      fillLevel++;
      if (fillLevel === 10) {
        finished = true;
      }
      if (fillLevel === 12) {
        overflow = true;
        clearInterval(interval);
      }
    }, 500);
  }
  return (
    <React.Fragment>
      <div className="startButton" onClick={handleStartCup}></div>
      <div className="cup">
        <p>{"#" + id}</p>
        <p>{quantity > 0 ? quantity : "empty"}</p>
        <p>{type}</p>
        <p>{active ? "active" : ""}</p>
        <p>{running ? "running" : ""}</p>
        <p>{finished ? "finished" : ""}</p>
        <p>{overflow ? "overflow!!!" : ""}</p>
      </div>
    </React.Fragment>
  );
}
