import taskRouter from "./tasks-router.js";
// console.log("check 2");

//this function accepts the app and sets its routes
export default (app) =>{
    // console.log("check 3");

    app.use("/",taskRouter);
}

