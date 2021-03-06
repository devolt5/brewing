import React from "react";
import "./Todoitem.css";

export default function Todoitem({ quantity, type, styleClass }) {
  const style = {
    backgroundImage: 'url("task_' + type + "_" + quantity + '.svg")'
  };

  return <div className={styleClass} style={style}></div>;
}
