import React from "react";

import "./ToDo.scss"

class ToDoItem extends React.Component {
    //We take the parameters during the Component initialization and it is available in the props parameter in the constructor

    constructor(props) {
        //We have to pass the props to the super always
        super(props);
        this.state = {
            id: props.todo.id,
            title: props.todo.title,
            description: props.todo.description,
            dueDate: props.todo.dueDate,
            dueTime: props.todo.dueTime,
            completed: props.todo.completed,
        }
    }
    toDoUpdater() {
        let completedStatus = this.state.completed;
        if (completedStatus) {
            completedStatus = false;
            // remove "completed-list" from the span class list
            const currentListItem = document.querySelector(".list-item-" + this.state.id);
            currentListItem.classList.remove("completed-list");

        } else {
            completedStatus = true;
            // add "completed-list" from the span class list
            const currentListItem = document.querySelector(".list-item-" + this.state.id);
            currentListItem.classList.add("completed-list");
        }
        this.setState({
            completed: completedStatus

        });
        // window.location.reload(false);
    }

    buttonText() {
        if (this.state.completed) {
            return "Closed";
        } else {
            return "Opened";
        }
    }
    listClassUpdater() {
        if (this.state.completed) {
            return "completed-list";
        }
    }


    componentDidUpdate() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch('http://localhost:8080/tasks/' + this.state.id, requestOptions);
    }

    render(props) {
        return <li className={"list-item-" + this.state.id + " " + this.listClassUpdater()}>
            <span className={"title"}>
                Title :
                <div className="content">
                    {this.state.title}
                </div>

            </span>
            <span className={"description"}>
                Description :
                <div className="content">
                    {this.state.description}
                </div>

            </span>
            <span className={"duedate"}>

                Due Date : <div className="content">
                    {this.state.dueDate}</div>
            </span>
            <span className={"duetime"}>
                Due Time :
                <div className="content">
                    {this.state.dueTime}
                </div>
            </span>
            <span>
                <button onClick={this.toDoUpdater.bind(this)}>{this.buttonText()}</button>
            </span>
        </li>
    }
}

export default ToDoItem;