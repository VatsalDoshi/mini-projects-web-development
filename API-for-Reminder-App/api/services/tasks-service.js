import Task from "./../models/task.js";

//service for saving the task
export const save = (newTask) => {
    // console.log("check 9");
    const task = new Task(newTask);
    // console.log("check 10");
    return task.save();
}

//service for searching the tasks or all the tasks or by task title
export const search = (query) => {
    const params = {...query};

    return Task.find(params).exec();

}

//service to get task by id
export const get = (id) => {
    const task = Task.findById(id).exec();

    return task;
}

//service to update task
export const update = (updatedTask) => {
    updatedTask.lastModifiedDate = new Date();
    const task = Task.findByIdAndUpdate(updatedTask.id, updatedTask).exec();
    console.log(task);

    return task;
}

//service to remove task
export const remove = (id) => {
    const task = Task.findByIdAndDelete(id).exec();
    return task;
}