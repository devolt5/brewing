import React from "react";
import Cup from "./Cup/Cup";
import "./Coffeemachine.css";

export default function Todolist({ cups }) {
  console.log(cups);

  return (
    <div className="machine">
      <h1>Maschine</h1>
      {cups.map(cup => (
        <Cup quantity={cup.quantity} type={cup.type} />
      ))}
    </div>
  );
}
