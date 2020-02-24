import React from 'react';
import Todoitem from './Todoitem/Todoitem';
import './Todolist.css'

export default function Todolist() {
    return (
        <div className="todolist"><h1>Todoliste</h1><Todoitem /></div>
    );
  }