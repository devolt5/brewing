import React from "react";
import Cup from "./Cup/Cup";
import "./Coffeemachine.css";
import button_active from "../../assets/button_active.svg";
import button_inactive from "../../assets/button_inactive.svg";
import button_trash from "../../assets/button_trash.svg";

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

  const finishedStyle = {
    backgroundImage: 'url("' + button_active + '")',
    opacity: 1
  };

  const idleStyle = {
    backgroundImage: 'url("' + button_inactive + '")'
  };

  const overflowStyle = {
    backgroundImage: 'url("' + button_trash + '")',
    opacity: 1
  };

  return (
    <div className="machine">
      {platform.map(platformSlot => (
        <div
          className="startButton"
          onClick={handleCupButton}
          plattformid={platformSlot.id}
          style={
            getCupStatus(platformSlot.id) === "running"
              ? idleStyle
              : getCupStatus(platformSlot.id) === "finished"
              ? finishedStyle
              : getCupStatus(platformSlot.id) === "overflow"
              ? overflowStyle
              : idleStyle
          }
        ></div>
      ))}
      <br /> <br />
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
