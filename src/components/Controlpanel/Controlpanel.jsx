import React from 'react';
import './Controlpanel.css'

export default function Controlpanel() {
    return (
      <div className="panel">
        <button className="controlbutton" type="button">Kaffee</button>
        <button className="controlbutton" type="button">Schokolade</button>
        <button className="controlbutton" type="button">Zucker</button>
      </div>
    );
  }