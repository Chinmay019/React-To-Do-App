import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
            required: true,
        },
        priority: {
            type: Boolean,
            default: false,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        }
    }
)

// new collection
const TaskCollection = mongoose.model('tasks', TaskSchema);

export default TaskCollection;