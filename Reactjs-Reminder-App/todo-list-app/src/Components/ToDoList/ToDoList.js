import React from "react";

import ToDoItem from "../ToDoItem/ToDo";
import './ToDoList.scss';
class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            DataisLoaded: false
        }
    }
    addToDo() {
        const titlefield = document.querySelector("#text-title");
        const description = document.querySelector("#text-description");
        const duedate = document.querySelector("#text-duedate");
        const duetime = document.querySelector("#text-duetime");

        if ((titlefield.value) === "" || description.value === "" || duedate.value === "" || duetime.value === "") {
            alert("Please Enter all data")
        }

        const objectForAPI = {
            title: titlefield.value,
            description: description.value,
            dueDate: duedate.value,
            dueTime: duetime.value
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objectForAPI)
        };
        fetch('http://localhost:8080/tasks/', requestOptions);
        window.location.reload(false);
    }
    componentDidMount() {
        fetch(
            "http://localhost:8080/tasks/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    todos: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        return (
            <div>
                <div className="add-section">
                    <input id="text-title" placeholder="Enter Title" ></input>
                    <input id="text-description" placeholder="Enter description"></input>
                    <input id="text-duedate" type="date" placeholder="Enter duedate"></input>
                    <input id="text-duetime" type="time" placeholder="Enter duetime"></input>
                    <button id="add-task-btn" onClick={this.addToDo.bind(this)}>Add To Do</button>
                </div>
                <ol>
                    {this.state.todos.map((value, key) => { return <ToDoItem todo={value} key={key}></ToDoItem> })}
                </ol>
            </div>
        );
    }
}

export default ToDoList;