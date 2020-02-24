import React from 'react';
import Todolist from './components/Todolist/Todolist'
import Coffeemachine from './components/Coffeemachine/Coffeemachine'
import Controlpanel from './components/Controlpanel/Controlpanel'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Todolist />
      <Coffeemachine />
      <Controlpanel />
    </React.Fragment>
  );
}

export default App;
