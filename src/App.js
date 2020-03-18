import React, { useState, useEffect, useRef } from "react";
import Todolist from "./components/Todolist/Todolist";
import Coffeemachine from "./components/Coffeemachine/Coffeemachine";
import Controlpanel from "./components/Controlpanel/Controlpanel";
import "./App.css";

//custom hook made by: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  //constants and variables
  const [todos, setTodos] = useState([]);
  const [cups, setCups] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [activeCup, setActiveCup] = useState(0);
  const [quantitySetting, setQuantitySetting] = useState(1);
  const todoLength = 4;

  //helper function to update props of current cup in platform
  function updateCupsProps(prop, id) {
    setCups(cups => {
      cups[id] = { ...cups[id], ...prop };
      return [...cups];
    });
  }

  function findNextEmpy(id) {
    //reset quantity and set next empty cup to active
    setQuantitySetting(1);
    const nextEmpty = cups.find(
      cup => cup.quantity === 0 && cup.id !== parseInt(id)
    );
    const index = cups.indexOf(nextEmpty);
    setActiveCup(index); //save the current active cup
    updateCupsProps({ active: true }, index);
  }

  //interval function which simulates filling of cups in platformSlot
  useInterval(() => {
    cups.forEach(cup => {
      if (cup.status === "running" || cup.status === "finished") {
        if (cup.fillLevel < 100) {
          let newFillLevel = cup.fillLevel + 1;
          updateCupsProps({ fillLevel: newFillLevel }, cup.id);
        }
        if (cup.fillLevel === 80) {
          updateCupsProps({ status: "finished" }, cup.id);
        }
        if (cup.fillLevel >= 100) {
          updateCupsProps({ status: "overflow" }, cup.id);
        }
      }
    });
  }, 50);

  useEffect(() => {
    let i = 0;
    //generator for todos
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
        correct: false,
        status: "empty",
        active: true
      },
      {
        id: 1,
        key: 1,
        quantity: 0,
        type: null,
        fillLevel: 0,
        correct: false,
        status: "empty",
        active: false
      },
      {
        id: 2,
        key: 2,
        quantity: 0,
        type: null,
        fillLevel: 0,
        correct: false,
        status: "empty",
        active: false
      },
      {
        id: 3,
        key: 3,
        quantity: 0,
        type: null,
        fillLevel: 0,
        correct: false,
        status: "empty",
        active: false
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

  //handle Ingredients Button
  const handleSelectIngredients = type => {
    if (cups[activeCup].quantity === 0) {
      updateCupsProps({ quantity: 1, type: type }, cups[activeCup].id);
    } else if (cups[activeCup].quantity === 1) {
      updateCupsProps({ quantity: 2, type: type }, cups[activeCup].id);
    } else if (cups[activeCup].quantity === 2) {
      for (let cup of cups) {
        if (cup.status === "empty" && cup.quantity != 2) {
          if (cup.quantity === 0) {
            updateCupsProps({ quantity: 1, type: type }, cup.id);
          }
          if (cup.quantity === 1) {
            updateCupsProps({ quantity: 2 }, cup.id);
          }
          break; //only add ingredients to one cup at once
        }
      }
    }
  };

  //handle Start/Stop Button
  const handleCupButton = event => {
    //FIXME checks not itself!!!
    let isACupActive = null;
    isACupActive = cups.find(cup => cup.active);
    //FIXME get currentId NOT via event but via react var
    const currentId = event.target.attributes.plattformid.value;
    //start cup only when not empty
    if (cups[currentId].quantity === 0) {
      return;
    }
    //start activeCup
    if (parseInt(currentId) === activeCup) {
      //search, if cup is holding a correct task
      for (let item of todos) {
        if (
          item.type === cups[currentId].type &&
          item.quantity === cups[currentId].quantity
        ) {
          updateCupsProps({ correct: true }, currentId);
          let index = todos.indexOf(item);
          todos[index] = randomizer(); //replace with new item
          //TODO what to do when the list empties?
          setTodos(todos); //inform react
          break; //delete only one matching task
        }
      }

      updateCupsProps({ status: "running" }, currentId);
      // setCups(cups => {
      //   const currentCup = {
      //     ...cups[currentId],
      //     status: "running"
      //   };
      //   cups[currentId] = currentCup;
      //   return [...cups];
      // });
    }
    //handle click when finished
    if (cups[currentId].status === "finished") {
      //if cup has correct ingredients
      if (cups[currentId].correct) {
        setPlayerScore(playerScore => {
          return playerScore + 1;
        });
      }

      //reset finished cup
      setCups(cups => {
        const currentCup = {
          ...cups[currentId],
          active: false,
          quantity: 0,
          type: null,
          fillLevel: 0,
          correct: false,
          status: "empty"
        };
        cups[currentId] = currentCup;
        return [...cups];
      });
      if (isACupActive !== "undefined") {
        findNextEmpy(currentId);
      }
    }
    //handle click when overflodded
    if (cups[currentId].status === "overflow") {
      //reset finished cup
      setCups(cups => {
        const currentCup = {
          ...cups[currentId],
          active: false,
          quantity: 0,
          type: null,
          correct: false,
          fillLevel: 0,
          status: "empty"
        };
        cups[currentId] = currentCup;
        return [...cups];
      });
      if (isACupActive !== "undefined") {
        findNextEmpy(currentId);
      }
    }
    if (
      //only when empty or running
      cups[currentId].status !== "finished" &&
      cups[currentId].status !== "overflow"
    ) {
      //don't activate another cup while current is active
      if (cups[currentId].quantity > 0) {
        findNextEmpy(currentId);
      }
    }
  };

  return (
    <React.Fragment>
      <p>{playerScore}</p>
      <Todolist todos={todos} />
      <Coffeemachine
        cups={cups}
        activeCup={activeCup}
        handleCupButton={handleCupButton}
      />
      <Controlpanel handleSelectIngredients={handleSelectIngredients} />
    </React.Fragment>
  );
}

export default App;
