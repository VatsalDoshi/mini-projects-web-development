import ToDo from '../models/toDo.js';

export const save = (newToDo) => {
    const toDoModel = new ToDo(newToDo);
    return toDoModel.save();
}

export const search = (query) =>{
    const params = {...query};
        return ToDo.find(params).exec();
}

export const get = (id) =>{
    const toDo = ToDo.findById(id).exec();
    return toDo;
}

export const update = (updatedToDo) => {
    updatedToDo.modifiedDate = new Date();
    const toDo = ToDo.findByIdAndUpdate(updatedToDo.id, updatedToDo,{new: true}).exec();
    return toDo;
}

export const remove = (id) => {
    const toDo = ToDo.findByIdAndDelete(id).exec();
    return toDo;
}