import mongoose from "mongoose"; //it is from not as that is why you got error earlier

// id, title, description, createdDate, & lastModifiedDate


//this is the schema for task
//commented the id field inorder to be able to perform search, delete and update operations on tasks
const Schema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required : "ID is required"
    // },
    title: {
        type: String,
        required : "Title is required"
    },
    description: {
        type: String,
        required : "Description is required"
    },
    createdDate: {
        type: Date,
        default : Date.now
    },
    lastModifiedDate : {
        type: Date,
        default : Date.now
    }

},{ skipVersioning : true});

const model = mongoose.model("todoTask", Schema);

export default model;
