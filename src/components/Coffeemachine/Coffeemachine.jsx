import React from "react";
import Cup from "./Cup/Cup";
import "./Coffeemachine.css";

export default function Coffeemachine({ cups, activeCup, handleStartCup }) {
  return (
    <div className="machine">
      <h1>Maschine</h1>
      {cups.map(cup => (
        <Cup
          key={cup.id}
          id={cup.id}
          quantity={cup.quantity}
          type={cup.type}
          active={cups.indexOf(cup) === activeCup ? true : false}
          running={cup.running}
          handleStartCup={handleStartCup}
        />
      ))}
    </div>
  );
}
