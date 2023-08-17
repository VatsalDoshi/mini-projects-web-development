import * as toDoService from "./../services/toDos-services.js";


//Sets Error into the response as an object
 const setErrorResponse = (error, response) => {
     response.status(500);
     response.json(error);
 }

 //Sets Success into the response as an object
const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

// Async post function responsible for add functionality

export const post = async (request, response) => {
     try {
        const payload = request.body;
        const toDo = await toDoService.save(payload);
        setSuccessResponse(toDo, response);
     } catch (error) {
         setErrorResponse(error, response);
     }
}

// Async function required for indexing the files

export const index = async (request, response) => {
    try{
        const title = request.query.title;
        const description = request.query.description;
        const createdDate = request.query.createddate;
        const modifiedDate = request.query.modifieddate;
        const query = {};
        if(title){
            query.title = title;
        }
        if(description){
            query.description = description;
        }
        if(createdDate){
            query.createddate = createdDate;
        }
        if(modifiedDate){
            query.modifiedDate = modifiedDate;
        }
        const toDos = await toDoService.search(query);
        setSuccessResponse(toDos, response);
    }catch(error){
        setErrorResponse(error, response);
    }
}

// Gets all the todos from the API

export const get = async (request, response) => {
    try{
        const id = request.params.id;
        const toDo = await toDoService.get(id);
        setSuccessResponse(toDo, response);
    }catch(error){
        setErrorResponse(error, response);
    }
}

// Function required for updating 

export const update = async (request, response) => {
    try{
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        const toDo = await toDoService.update(updated);
        setSuccessResponse({message:`Successfully Updated ${id}`}, response);
    }catch(error){
        setErrorResponse(error, response);
    }
}

export const remove = async (request, response) => {
    try{
        const id = request.params.id;
        
        const toDo = await toDoService.remove(id);
        setSuccessResponse({message:`Successfully Removed ${id}`}, response);
    }catch(error){
        setErrorResponse(error, response);
    }
}