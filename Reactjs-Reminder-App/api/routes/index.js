import toDoRouter from './todo-router.js';

export default (app) =>{
    app.use('/', toDoRouter);
}