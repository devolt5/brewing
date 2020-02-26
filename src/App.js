import React, { useState, useEffect } from "react";
import Todolist from "./components/Todolist/Todolist";
import Coffeemachine from "./components/Coffeemachine/Coffeemachine";
import Controlpanel from "./components/Controlpanel/Controlpanel";
import "./App.css";

function App() {
  //helper function to update props of current cup in platform
  function updateCupsProps(prop, id) {
    setCups(cups => {
      cups[id] = { ...cups[id], ...prop };
      return [...cups];
    });
  }

  //interval function which simulates filling of cup in platformSlot
  function processCup(id) {
    let fillLevel = 0;
    //set to running
    updateCupsProps({ status: "running" }, id);
    const interval = setInterval(() => {
      //update cups fillLevel frequently
      updateCupsProps({ fillLevel: fillLevel }, id);
      //set cup to inactive to handle next cup
      updateCupsProps({ active: false }, id);
      fillLevel++;
      if (fillLevel === 10) {
        updateCupsProps({ status: "finished" }, id);
      }
      if (fillLevel === 14) {
        updateCupsProps({ status: "overflow" }, id);
        clearInterval(interval);
      }
    }, 500);
  }

  const [todos, setTodos] = useState([]);
  const [cups, setCups] = useState([]);
  const [activeCup, setActiveCup] = useState(0);
  const [quantitySetting, setQuantitySetting] = useState(1);
  const todoLength = 3;

  useEffect(() => {
    let i = 0;
    while (i < todoLength) {
      setTodos(todos => {
        return [...todos, randomizer()];
      });
      i++;
    }
    //TODO implement generator for more than 4 cups
    setCups([
      {
        id: 0,
        key: 0,
        quantity: 0,
        type: null,
        fillLevel: 0,
        status: "empty",
        active: true,
        process: processCup
      },
      {
        id: 1,
        key: 1,
        quantity: 0,
        type: null,
        fillLevel: 0,
        status: "empty",
        active: false,
        process: processCup
      },
      {
        id: 2,
        key: 2,
        quantity: 0,
        type: null,
        fillLevel: 0,
        status: "empty",
        active: false,
        process: processCup
      },
      {
        id: 3,
        key: 3,
        quantity: 0,
        type: null,
        fillLevel: 0,
        status: "empty",
        active: false,
        process: processCup
      }
    ]);
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

  //handle Start Button
  const handleStartCup = event => {
    //FIXME get currentId NOT via event but via react var
    const currentId = event.target.attributes.plattformid.value;
    if (
      cups[currentId].status === "empty" &&
      parseInt(currentId) === activeCup
    ) {
      cups[currentId].process(currentId);
    }
    //reset quantity and set next empty cup to active
    setQuantitySetting(1);
    const nextEmpty = cups.find(
      cup => cup.status === "empty" && cup.id !== parseInt(currentId)
    );
    const index = cups.indexOf(nextEmpty);
    //save the current active cup
    setActiveCup(index);
    //update active status of cup
    setCups(cups => {
      const currentCup = { ...cups[index], active: true };
      cups[index] = currentCup;
      return [...cups];
    });
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
