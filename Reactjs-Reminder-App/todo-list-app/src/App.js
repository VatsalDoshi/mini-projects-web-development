// importing react 
import React from 'react';
//Importing Styles
import './App.scss';
import ToDoList from './Components/ToDoList/ToDoList';


//By Default react is auto completed with functional components but we are going to change it into a class component and use it instead
class App extends React.Component {
  render() {
    return <div className="App">
      <h2>To Do List</h2>
      <ToDoList></ToDoList>
    </div>;
  }
}

export default App;
