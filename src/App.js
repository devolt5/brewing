import React, { useState, useEffect, useRef } from "react";
import Todolist from "./components/Todolist/Todolist";
import Coffeemachine from "./components/Coffeemachine/Coffeemachine";
import Controlpanel from "./components/Controlpanel/Controlpanel";
import "./App.css";

//own hook made by: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
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
  //helper function to update props of current cup in platform
  function updateCupsProps(prop, id) {
    setCups(cups => {
      cups[id] = { ...cups[id], ...prop };
      return [...cups];
    });
  }

  const [todos, setTodos] = useState([]);
  const [cups, setCups] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [activeCup, setActiveCup] = useState(0);
  const [quantitySetting, setQuantitySetting] = useState(1);
  const todoLength = 3;

  //interval function which simulates filling of cups in platformSlot
  useInterval(() => {
    cups.forEach(cup => {
      // console.log(cup);
    });
  }, 1000);

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
        active: true
      },
      {
        id: 1,
        key: 1,
        quantity: 0,
        type: null,
        fillLevel: 0,
        status: "empty",
        active: false
      },
      {
        id: 2,
        key: 2,
        quantity: 0,
        type: null,
        fillLevel: 0,
        status: "empty",
        active: false
      },
      {
        id: 3,
        key: 3,
        quantity: 0,
        type: null,
        fillLevel: 0,
        status: "empty",
        active: false
      }
    ]);

    // setInterval(
    //   () => {
    //     // console.log("1sec");
    //     console.log(getCups());

    //     // console.log(cups);
    //     // currentCups.forEach(cup => {
    //     //   console.log(cup);
    //     // });

    //     // //update cups fillLevel frequently
    //     // updateCupsProps({ fillLevel: fillLevel }, id);
    //     // //set cup to inactive to handle next cup
    //     // updateCupsProps({ active: false }, id);
    //     // fillLevel++;
    //     // if (fillLevel === 10) {
    //     //   updateCupsProps({ status: "finished" }, id);
    //     // }
    //     // if (fillLevel === 14) {
    //     //   updateCupsProps({ status: "overflow" }, id);
    //     //   clearInterval(interval);
    //     // }
    //   },
    //   1000,
    //   getCups
    // );
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
  const handleSelectIngredients = type => {
    //change quantity between 1 and 2
    //TODO if category is changed, reset to 1 in every case
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
  const handleCupButton = event => {
    //FIXME get currentId NOT via event but via react var
    const currentId = event.target.attributes.plattformid.value;
    //start cup only when not empty
    if (cups[currentId].quantity === 0) {
      return;
    }
    //start process only on activeCup
    if (parseInt(currentId) === activeCup) {
      cups[currentId].process(currentId, false);
    }
    //handle click when finished
    if (cups[currentId].status === "finished") {
      for (let item of todos) {
        if (item.type === cups[currentId].type) {
          let index = todos.indexOf(item);
          todos[index] = randomizer(); //replace with new item
          //TODO what to do when the list empties?
          setTodos(todos); //inform react
          setPlayerScore(playerScore => {
            return playerScore + 1;
          });

          //reset finished cup
          cups[currentId].process(currentId, true);
          setCups(cups => {
            const currentCup = {
              ...cups[currentId],
              active: false,
              quantity: 0,
              type: null,
              fillLevel: 0,
              status: "empty"
            };
            cups[currentId] = currentCup;
            return [...cups];
          });
          break; //delete only one matching task
        }
      }
    }
    //reset quantity and set next empty cup to active
    setQuantitySetting(1);
    const nextEmpty = cups.find(
      cup => cup.quantity === 0 && cup.id !== parseInt(currentId)
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
