import React from "react";
import Cup from "./Cup/Cup";
import "./Coffeemachine.css";

export default function Coffeemachine({ cups, activeCup, handleStartCup }) {
  //controls the filling of cups
  const platform = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div className="machine">
      <h1>Maschine</h1>

      {platform.map(platformSlot => (
        <div
          className="startButton"
          onClick={handleStartCup}
          plattformid={platformSlot.id}
        ></div>
      ))}

      {cups.map(cup => (
        <Cup
          key={cup.id}
          id={cup.id}
          quantity={cup.quantity}
          type={cup.type}
          active={cups.indexOf(cup) === activeCup ? true : false}
          running={cup.running}
        />
      ))}
    </div>
  );
}
