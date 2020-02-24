import React, { useState, useEffect } from "react";
import Todolist from "./components/Todolist/Todolist";
import Coffeemachine from "./components/Coffeemachine/Coffeemachine";
import Controlpanel from "./components/Controlpanel/Controlpanel";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [cups, setCups] = useState([]);
  const [activeCup, setActiveCup] = useState(0);
  const [quantitySetting, setQuantitySetting] = useState(1);
  const todoLength = 3;
  const cupsLength = 4;

  useEffect(() => {
    let i = 0;
    while (i < todoLength) {
      setTodos(todos => {
        return [...todos, randomizer()];
      });
      i++;
    }
    let j = 0;
    while (j < cupsLength) {
      setCups(cups => {
        return [
          ...cups,
          {
            id: j++, //TODO fix wrong counter
            key: j++,
            quantity: 0,
            type: null,
            running: false
          }
        ];
      });
      j++;
    }
  }, []);

  //generate todos
  const randomizer = () => {
    const types = ["coffee", "chocolate", "sugar"];
    const randomQuantity = Math.floor(Math.random() * 2) + 1;
    const randomType = types[Math.floor(Math.random() * 3)];
    return {
      quantity: randomQuantity,
      type: randomType
    };
  };

  //handle ControlPanel Button
  const handleClick = type => {
    //change quantity between 1 and 2
    quantitySetting === 2 ? setQuantitySetting(1) : setQuantitySetting(2);

    setCups(cups => {
      const currentCup = {
        quantity: quantitySetting,
        type: type
      };
      cups[activeCup] = { ...cups[activeCup], ...currentCup };
      return [...cups];
    });
  };

  const handleStartCup = () => {
    //start current cup by setting running to true
    setCups(cups => {
      const currentCup = { ...cups[activeCup], running: true };
      cups[activeCup] = currentCup;
      return [...cups];
    });

    //reset quantity and set next empty cup to active
    setQuantitySetting(1);
    const nextEmpty = cups.find(cup => cup.quantity === 0);
    const index = cups.indexOf(nextEmpty);
    setActiveCup(index);
  };

  return (
    <React.Fragment>
      <Todolist todos={todos} />
      <Coffeemachine
        cups={cups}
        activeCup={activeCup}
        handleStartCup={handleStartCup}
      />
      <br />
      <Controlpanel handleClick={handleClick} />
    </React.Fragment>
  );
}

export default App;
