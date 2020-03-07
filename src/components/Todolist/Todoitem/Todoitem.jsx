import React from "react";
import "./Todoitem.css";

export default function Todoitem({ quantity, type }) {
  const style = {
    backgroundImage: 'url("task_' + type + "_" + quantity + '.svg")'
  };

  return <div className="item" style={style}></div>;
}
