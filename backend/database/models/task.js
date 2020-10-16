const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        trim:true,
        minlength:3
    },
    _listId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    completed: {
        type: Boolean,
        default:false
    },
    notes:{
        type: String
    },
    progress:{
        type: String
    },
    deadline:{
        type: String
    },
    submittime:{
        type: Boolean,
    }
}
);
const Task = mongoose.model('Task',TaskSchema);
module.exports = Task;