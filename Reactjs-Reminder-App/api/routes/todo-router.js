import express from "express";
import ToDo from "../models/toDo.js";
import * as toDosController from './../controllers/todos-controller.js';

const router = express.Router();

router.route('/todoitems')
    .post(toDosController.post)
    .get(toDosController.index);

router.route('/todoitems/:id')
    .get(toDosController.get)
    .put(toDosController.update)
    .delete(toDosController.remove);

export default router;