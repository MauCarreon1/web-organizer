const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: true
    }
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = {
    TaskModel
};