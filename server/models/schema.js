import mongoose from "mongoose";

const ToDoSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: false
        },
        userName: {
            type: String,
            required: true,
            minLength: 3
        },
        taskID: {
            type: String,
            required: true,
            unique: true,
        },
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
        }
    }
)

// new collection
const To_Do_Collection = mongoose.model('Todo', ToDoSchema);

export default To_Do_Collection;