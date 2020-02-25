import React, { useState, useEffect } from "react";
import Todolist from "./components/Todolist/Todolist";
import Coffeemachine from "./components/Coffeemachine/Coffeemachine";
import Controlpanel from "./components/Controlpanel/Controlpanel";
import "./App.css";

function App() {
  //helper function for updating the status of platformSlot
  function updatePlatformStatus(status, id) {
    setPlatform(platform => {
      const currentplatform = {
        status: status
      };
      platform[id] = { ...platform[id], ...currentplatform };
      return [...platform];
    });
  }

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
    //block, if already running
    if (platform[id].status === "running") {
      return;
    }
    //set to running
    updatePlatformStatus("running", id);
    const interval = setInterval(() => {
      //update cups fillLevel frequently
      updateCupsProps({ fillLevel: fillLevel }, id);
      fillLevel++;
      if (fillLevel === 10) {
        updatePlatformStatus("finished", id);
        updateCupsProps({ status: "finished" }, id);
      }
      if (fillLevel === 12) {
        updatePlatformStatus("overflow", id);
        updateCupsProps({ status: "overflow" }, id);
        clearInterval(interval);
      }
    }, 500);
  }

  const [todos, setTodos] = useState([]);
  const [cups, setCups] = useState([]);
  const [platform, setPlatform] = useState([
    { id: 0, fillLevel: 0, status: "idle", process: processCup },
    { id: 1, fillLevel: 0, status: "idle", process: processCup },
    { id: 2, fillLevel: 0, status: "idle", process: processCup },
    { id: 3, fillLevel: 0, status: "idle", process: processCup }
  ]);
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
      { id: 0, key: 0, quantity: 0, type: null, fillLevel: 0, status: "empty" },
      { id: 1, key: 1, quantity: 0, type: null, fillLevel: 0, status: "empty" },
      { id: 2, key: 2, quantity: 0, type: null, fillLevel: 0, status: "empty" },
      { id: 3, key: 3, quantity: 0, type: null, fillLevel: 0, status: "empty" }
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

  const handleStartCup = event => {
    const currentId = event.target.attributes.plattformid.value;
    platform[currentId].process(currentId);
    //start current cup by setting running to true
    // setCups(cups => {
    //   const currentCup = { ...cups[activeCup], running: true };
    //   cups[activeCup] = currentCup;
    //   return [...cups];
    // });

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
