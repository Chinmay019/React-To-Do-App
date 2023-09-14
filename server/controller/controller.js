// import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import ToDoCollection from "../models/UserSchema.js";
import TaskCollection from "../models/TaskSchema.js";
// import Connection from "../database/db.js";
import mongoose from "mongoose";
import { MongoClient } from "mongodb"
import { ObjectId } from "mongodb";
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const Connection = async () => {
    const MongoDB_URI = `mongodb+srv://${user}:${password}@todo-app.vb58zfw.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(MongoDB_URI);
    try {
        const connect = await client.connect('', { useNewUrlParser: true, useUnifiedTopology: true });
        let db = connect.db("test");
        if (db) {
            console.log("Connected to MongoDB from mongo");
        }
        return db;
    } catch (error) {
        console.log("Following error occurred", error);
    }

    // mongoose.connect(MongoDB_URI, { useNewUrlParser: true });

    // mongoose.connection.on("connected", () => {
    //     console.log("Connected to MongoDB");
    // })
    // mongoose.connection.on("disconnected", () => {
    //     console.log("MongoDB disconnected");
    // })
    // mongoose.connection.on("error", (error) => {
    //     console.log("Following error occurred", error.messages);
    // })
}

const db = await Connection();
const userCollection = await db.collection("users");
const taskCollection = await db.collection("tasks");

let response = {}

export const getAllUsers = async (req, res) => {
    try {
        const info = await ToDoCollection.find({});
        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ToDoCollection.findById(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// export const getUserInfo = async (req, res) => {
//     try {
//         const { userName } = req.params;
//         // const { userInfo, user_Id } = await getUserByUserName(req, res, userName);
//         // const userTasks = await getUserTasks(user_Id);
//         res.status(200).json(userTasks);
//         return userTasks;
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

export const getUserByUserName = async (req, res) => {
    try {
        console.log("Getting user");
        const { userName } = req.params;
        console.log(userName);
        const user = await userCollection.find({ userName: userName }).toArray();
        console.log(user);
        if (user.length > 0) {
            const userDetails = user[0];
            const user_Id = userDetails.user_Id;
            const userTasks = await getUserTasks(user_Id);
            console.log(userTasks);
            res.status(200).json(userTasks);
            // return {
            //     userInfo: userDetails,
            //     user_Id: userDetails.user_Id
            // }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
        // } else {
        //     res.status(404).json({ message: 'User not found' });
        // }
        // console.log(user);
        // if (userDetails.userName) {
        //     response.userName = userDetails.userName;
        // }
        // if (userDetails.user_Id) {
        //     response.user_Id = userDetails.user_Id;
        // }
        // if (userDetails._id) {
        //     response.userObjectId = userDetails._id;
        // }

        // const tasks = await getUserTasks(userDetails.user_Id);
        // return {
        //     userInfo: userDetails,
        //     user_Id: userDetails.user_Id
        // }

        // res.status(200).json(userDetails);
        // return user;
    } catch (error) {
        res.status(404).json({ message: error.message });
        // throw new Error(error.message);
    }
}

export const getUserTasks = async (user_id) => {
    try {
        console.log("getting users tasks");
        const agg = [
            {
                '$match': {
                    'user_Id': `${user_id}`
                }
            },
            {
                '$lookup': {
                    'from': 'tasks',
                    'localField': 'user_Id',
                    'foreignField': 'userId',
                    'as': 'userTasks'
                }
            }, {
                '$project': {
                    '_id': 1,
                    'userTasks': 1,
                    'user_Id': 1,
                    'userName': 1
                }
            }
        ];
        const cursor = await userCollection.aggregate(agg);
        const result = await cursor.toArray();
        // res.status(200).json(result);
        return result;
    } catch (error) {
        // res.status(400).json({ message: error.message });
        throw new Error(error.message);
    }
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskCollection.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        console.log('Creating user');
        console.log(req.body);
        const user = await userCollection.insertOne(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// export const handleUpdateItem = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);
//         console.log("req.body", req.body);
//         // if (req.body.title) {
//         //     parameter = req.body.title;
//         // }
//         const updated = await updateTaskTitle(req, res, id);
//         res.status(200).json({ updated });

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

export const updateTask = async (req, res, id) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log("req.body", req.body);
        const updateTask = await taskCollection.updateMany({ "_id": new ObjectId(id) }, { $set: { "title": `${req.body.title}`, "completed": `${req.body.completed}`, "priority": `${req.body.priority}` } }, {
            new: true,
        });
        console.log(updateTask);
        res.status(200).json({ updateTask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskCollection.deleteOne({ "_id": id });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateUserTasks = async (req, res) => {
    try {
        console.log("Updating user tasks");
        const { userName, id } = req.params;
        console.log(id);
        // const user = await ToDoCollection.findById({ userName: userName });
        // console.log(user);
        const tasks = req.body;
        console.log(tasks);
        const updatedTasks = await ToDoCollection.updateOne({ "_id": id }, { $set: { tasks: tasks } }, { new: true });
        console.log("task : ", updatedTasks);
        res.status(200).json(updatedTasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const task = await TaskCollection.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
