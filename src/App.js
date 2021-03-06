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
  const todoLength = 4;

  //helper function to update props of current cup in platform
  function updateCupsProps(prop, id) {
    setCups(cups => {
      cups[id] = { ...cups[id], ...prop };
      return [...cups];
    });
  }

  function findNextEmpy(id) {
    //set next empty cup to active
    const nextEmpty = cups.find(
      //FIXME Bug, when all cups are processing, emptycup needs two clicks
      cup => cup.status === "empty" && cup.id !== parseInt(id)
    );
    let index = cups.indexOf(nextEmpty);
    // if (index === -1) {
    //   if (cups[id].status === "finished") {
    //     index = id;
    //   }
    // }
    setActiveCup(index); //save the current active cup
    updateCupsProps({ active: true }, index);
  }

  //interval function which simulates filling of cups
  useInterval(() => {
    cups.forEach(cup => {
      let levelOverflow = 200;
      let levelFinished = 160;
      //double for a large cup
      if (cup.quantity === 2) {
        levelOverflow = levelOverflow * 2;
        levelFinished = levelFinished * 2;
      }
      if (cup.status === "running" || cup.status === "finished") {
        if (cup.fillLevel < levelOverflow) {
          let newFillLevel = cup.fillLevel + 1;
          updateCupsProps({ fillLevel: newFillLevel }, cup.id);
        }
        if (cup.fillLevel === levelFinished) {
          updateCupsProps({ status: "finished" }, cup.id);
        }
        if (cup.fillLevel >= levelOverflow) {
          updateCupsProps({ status: "overflow" }, cup.id);
        }
      }
      //pseudo filling used as a counter for icon
      if (cup.status === "deleted") {
        let newFillLevel = cup.fillLevel + 1;
        updateCupsProps({ fillLevel: newFillLevel }, cup.id);
        //approx. 500ms
        if (cup.fillLevel === 10) {
          //reset cup
          setCups(cups => {
            const currentCup = {
              ...cups[cup.id],
              quantity: 0,
              type: null,
              correct: false,
              fillLevel: 0,
              status: "empty"
            };
            cups[cup.id] = currentCup;
            return [...cups];
          });
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
      type: randomType,
      style: "item slidein"
    };
  };

  //handle Ingredients Button
  const handleSelectIngredients = type => {
    //FIXME there can be no active cup!! so there is no property "quantity"
    if (cups[activeCup].quantity === 0) {
      updateCupsProps({ quantity: 1, type: type }, cups[activeCup].id);
    } else if (cups[activeCup].quantity === 1) {
      updateCupsProps({ quantity: 2, type: type }, cups[activeCup].id);
    } else if (cups[activeCup].quantity === 2) {
      for (let cup of cups) {
        if (cup.status === "empty" && cup.quantity !== 2) {
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

  const handleCupClick = id => {
    setActiveCup(id);
    if (cups[id].quantity !== 0) {
      updateCupsProps({ quantity: 0, status: "deleted", fillLevel: 0 }, id);
    }
  };

  //handle Start/Stop Button
  const handleCupButton = id => {
    const currentId = id;
    //start cup only when not empty
    if (cups[currentId].quantity === 0) {
      return;
    }
    // === START CUP ===
    if (parseInt(currentId) === activeCup) {
      //search, if cup is holding a correct task
      for (let item of todos) {
        if (
          item.type === cups[currentId].type &&
          item.quantity === cups[currentId].quantity
        ) {
          updateCupsProps({ correct: true }, currentId);
          let index = todos.indexOf(item);
          console.log(index);

          //change class, so that new items slides in
          setTodos(todos => {
            const currentTodo = {
              ...todos[index],
              style: "item"
            };
            todos[index] = currentTodo;
            return [...todos];
          });

          //take some time to change class
          setTimeout(() => {
            todos[index] = randomizer(); //replace with new item
            //TODO what to do when the list empties?
            setTodos(todos); //inform react
          }, 300);

          break; //delete only one matching task
        }
      }
      updateCupsProps({ status: "running", active: false }, currentId);
      // findNextEmpy(currentId);
    }
    // === FINISH CUP ===
    if (cups[currentId].status === "finished") {
      //if cup has correct ingredients
      if (cups[currentId].correct) {
        setPlayerScore(playerScore => {
          return playerScore + 100;
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
      // if (isACupActive !== "undefined") {
      //   findNextEmpy(currentId);
      // }
    }
    // === OVERFLOW CUP ===
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
      // if (isACupActive !== "undefined") {
      //   findNextEmpy(currentId);
      // }
    }
    // if (
    //   //only when empty or running
    //   cups[currentId].status !== "finished" &&
    //   cups[currentId].status !== "overflow"
    // ) {
    //   //don't activate another cup while current is active
    //   // if (cups[currentId].quantity > 0) {
    //   findNextEmpy(currentId);
    //   // }
    // }
    let isACupActive = null;
    isACupActive = cups.find(cup => cup.active);
    if (isACupActive !== "undefined") {
      findNextEmpy(currentId);
    }
  };

  return (
    <React.Fragment>
      <div className="score">
        <p>Ergebnis: {playerScore}</p>
      </div>

      <Todolist todos={todos} />
      <Coffeemachine
        cups={cups}
        activeCup={activeCup}
        handleCupButton={handleCupButton}
        handleCupClick={handleCupClick}
      />
      <Controlpanel handleSelectIngredients={handleSelectIngredients} />
    </React.Fragment>
  );
}

export default App;
