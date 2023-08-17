import mongoose from "mongoose";

// Has the data model for the todo item

const Schema  = new mongoose.Schema({
    title:{
        type: String,
        required: 'Title is required.'
    },
    description:{
        type: String,
        required: 'Description is required.'
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
},{skipVersioning: true });

Schema.virtual('id', ()=>this.id.toHexString());
Schema.set('toJSON', {virtuals: true});

const ToDo = mongoose.model('todo', Schema);

export default ToDo;