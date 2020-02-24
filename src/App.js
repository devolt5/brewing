import React, { useState, useEffect } from "react";
import Todolist from "./components/Todolist/Todolist";
import Coffeemachine from "./components/Coffeemachine/Coffeemachine";
import Controlpanel from "./components/Controlpanel/Controlpanel";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [cups, setCups] = useState([]);
  const todoLength = 3;

  useEffect(() => {
    let i = 0;
    while (i < todoLength) {
      setTodos(todos => {
        return [...todos, randomizer()];
      });
      i++;
    }
  }, []);

  const randomizer = () => {
    const types = ["coffee", "chocolate", "sugar"];
    const randomQuantity = Math.floor(Math.random() * 2) + 1;
    const randomType = types[Math.floor(Math.random() * 3)];
    return {
      quantity: randomQuantity,
      type: randomType
    };
  };

  const handleClick = type => {
    if (cups.length < 4) {
      setCups(cups => {
        return [
          ...cups,
          {
            quantity: 1,
            type: type
          }
        ];
      });
    }
  };

  return (
    <React.Fragment>
      <Todolist todos={todos} />
      <Coffeemachine cups={cups} />
      <br />
      <Controlpanel handleClick={handleClick} />
    </React.Fragment>
  );
}

export default App;
