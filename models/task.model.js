const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true

    }
},{ timestamps: true, versionKey: false})
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;