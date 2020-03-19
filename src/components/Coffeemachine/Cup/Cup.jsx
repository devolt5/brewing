import React, { useState, useEffect } from "react";
import "./Cup.css";

export default function Cup({
  quantity,
  type,
  active,
  fillLevel,
  status,
  handleCupClick
}) {
  const activeStyle = {
    backgroundImage: 'url("cup_ready.svg")'
  };

  const [size, setSize] = useState();
  const [factor, setFactor] = useState(0.35); //varies between small or large cup

  //renders an image with 1 or 2 ingredients inside of cup
  const renderIngredients = () => {
    if (quantity === 2) {
      return <img alt="" src={"double" + type + ".svg"} />;
    }
    return <img alt="" src={type + ".svg"} />;
  };

  //varies between small and large cups
  const cupStyle = {
    backgroundImage: 'url("cup_' + size + '.svg")'
  };

  const dirtyStyle = {
    backgroundImage: 'url("cup_' + size + '_dirty.svg")'
  };

  useEffect(() => {
    setSize("small");
    setFactor(0.35);
    if (quantity === 2) {
      setFactor(0.26);
      setSize("large");
    }
  }, [quantity]);

  //Cup is build as follows:
  //<div class="cup"> Wrapper
  //  <img /> Ingredients
  //    <div> Spurt and Liquid Wrapper
  //      <div> Spurt
  //      <div> Liquid
  return (
    <div
      className="cup"
      onClick={handleCupClick}
      style={
        active ? activeStyle : status === "overflow" ? dirtyStyle : cupStyle
      }
    >
      {quantity !== 0 ? renderIngredients() : ""}
      {status === "deleted" ? <img alt="" src="trash_icon.svg" /> : ""}
      {active ? (
        ""
      ) : (
        <div>
          {status === "running" || status === "finished" ? (
            <div className="spurt"></div>
          ) : (
            ""
          )}
          {status !== "overflow" ? (
            <div
              className="liquid"
              style={{ height: fillLevel * factor }}
            ></div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
