import { ObjectId } from "mongodb";
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
        tasks: {
            type: Array,
            required: false,
            items: {
                type: ObjectId,
                required: true
            }
        }
    }
)

// new collection
const ToDoCollection = mongoose.model('users', ToDoSchema);

export default ToDoCollection;