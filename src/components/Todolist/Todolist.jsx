import React from "react";
import Todoitem from "./Todoitem/Todoitem";
import "./Todolist.css";

export default function Todolist({ todos }) {
  return (
    <div className="todolist">
      <div className="bar"></div>
      {todos.map(item => (
        <Todoitem quantity={item.quantity} type={item.type} />
      ))}
    </div>
  );
}
