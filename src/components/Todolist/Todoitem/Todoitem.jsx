import React from "react";
import "./Todoitem.css";

export default function Todoitem({ quantity, type, styleClass }) {
  //TODO add handler from button which changes class to "item slidein"

  // const [styleClass, setStyleClass] = useState("item slidein");

  const style = {
    backgroundImage: 'url("task_' + type + "_" + quantity + '.svg")'
  };

  return <div className={styleClass} style={style}></div>;
}
