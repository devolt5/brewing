import React from "react";
import Cup from "./Cup/Cup";
import "./Coffeemachine.css";

export default function Coffeemachine({ cups, activeCup, handleCupButton }) {
  //controls the filling of cups
  const platform = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

  //helper to get status of cup
  const getCupStatus = id => {
    if (cups.length > 0) {
      return cups[id].status;
    }
    return null;
  };

  const buttonStyle = {
    backgroundColor: "green"
  };

  return (
    <div className="machine">
      <h1>Maschine</h1>

      {platform.map(platformSlot => (
        <div
          className="startButton"
          onClick={handleCupButton}
          plattformid={platformSlot.id}
          style={
            getCupStatus(platformSlot.id) === "finished" ? buttonStyle : {}
          }
        ></div>
      ))}
      <br />
      {cups.map(cup => (
        <Cup
          key={cup.id}
          id={cup.id}
          quantity={cup.quantity}
          type={cup.type}
          active={cups.indexOf(cup) === activeCup ? true : false}
          fillLevel={cup.fillLevel}
          status={cup.status}
        />
      ))}
    </div>
  );
}
