import express from "express";
import * as tasksController from "./../controllers/tasks-controller.js"

// console.log("check 4");

const router = express.Router();
//this part is for accessing the routes 
router.route("/tasks")
    .post(tasksController.post)
    .get(tasksController.index);


    

router.route("/tasks/:id")
    .get(tasksController.get)
    .put(tasksController.update)
    .delete(tasksController.remove);




// console.log("check 5");

export default router;