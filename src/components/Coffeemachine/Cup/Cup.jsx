import React, { useState, useEffect } from "react";
import "./Cup.css";

export default function Cup({ id, quantity, type, active, fillLevel, status }) {
  const activeStyle = {
    backgroundImage: 'url("cup_ready.svg")'
  };

  const [size, setSize] = useState();
  const [factor, setFactor] = useState(0.7); //varies between small or large cup

  //renders an image with 1 or 2 ingredients inside of cup
  const renderIngredients = () => {
    if (quantity === 2) {
      return <img src={"double" + type + ".svg"} />;
    }
    return <img src={type + ".svg"} />;
  };

  //varies between small and large cups
  const cupStyle = {
    backgroundImage: size
  };

  useEffect(() => {
    setSize('url("cup_small.svg")');
    setFactor(0.7);
    if (quantity === 2) {
      setFactor(1);
      setSize('url("cup_large.svg")');
    }
  }, [quantity]);

  //Cup is build as follows:
  //<div class="cup"> Wrapper
  //  <img /> Ingredients
  //    <div> Spurt and Liquid Wrapper
  //      <div> Spurt
  //      <div> Liquid
  return (
    <div className="cup" style={active ? activeStyle : cupStyle}>
      {type !== null ? renderIngredients() : ""}
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
