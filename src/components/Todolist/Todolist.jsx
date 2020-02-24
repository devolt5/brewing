import React from "react";
import Todoitem from "./Todoitem/Todoitem";
import "./Todolist.css";

export default function Todolist({ todos }) {
  return (
    <div className="todolist">
      <h1>Todoliste</h1>
      <p>{todos.length}</p>
      {todos.map(item => (
        <Todoitem quantity={item.quantity} type={item.type} />
      ))}
    </div>
  );
}
