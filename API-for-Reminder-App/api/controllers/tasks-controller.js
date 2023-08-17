import * as tasksService from "./../services/tasks-service.js"

//controller for saving the task
export const post = async (request,response) => {

    // console.log("check 6");

    try{
        const payload = request.body;
        // console.log("check 7");
        const task = await tasksService.save(payload);
        // console.log("check 11");

        setSuccessResponse(task,response);
        
    } catch(error){
        // console.log("check 8");

        setErrorResponse(error,response);

    }

}

//boilerplate for success response
const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

//boiler plate for error response
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error)

}

//controller for searching all the tasks or task by title
export const index = async(request,response) => {
    // console.log("check 1.0");
    try{
        // console.log("check 2.0");
        const id = request.query.id;
        const title = request.query.title;
        const query = {};
        // console.log(id);
        // console.log(title);
        if(id){

            query.id = id;
            // console.log("id is here ",id);
        }

        if(title){
            query.title = title;
            // console.log("title is here ",title);
        }

        const tasks = await tasksService.search(query);
        // console.log("check 3.0");

        setSuccessResponse(tasks,response);

    } catch(error){
        // console.log("check 4.0");

        console.error(error.message);
        setErrorResponse(error,response);

        
    }
}

//controller for get task by id
export const get = async (request,response) =>{
    try{

        const id = request.params.id;
        const task = await tasksService.get(id);
        
        setSuccessResponse(task,response);


    } catch(error){
        console.error(error.message);
        setErrorResponse(error,response);

    }

}

//controller to update task 
export const update = async (request, response) => {

    try{

        const id = request.params.id;
        console.log(id);
        const updated = {...request.body};
        updated.id = id;
        const task = await tasksService.update(updated);
        setSuccessResponse(task,response);


    } catch(error){
        console.error(error.message);
        setErrorResponse(error,response);

    }

}

//controller to delete task
export const remove = async (request,response) => {
    try{

        const id = request.params.id;
        const task = await tasksService.remove(id);
        setSuccessResponse({message : "Successfully deleted"}, response);


    } catch(error){

        console.error(error.message);
        setErrorResponse(error,response);
    }


}