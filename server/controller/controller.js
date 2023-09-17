import dotenv from "dotenv";
dotenv.config();
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
}

const db = await Connection();
const userCollection = await db.collection("users");
const taskCollection = await db.collection("tasks");

export const getAllUsers = async (req, res) => {
    try {
        const info = await ToDoCollection.find({});
        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getUserByUserName = async (req, res) => {
    try {
        const { userName } = req.params;
        const user = await userCollection.find({ userName: userName }).toArray();
        if (user.length > 0) {
            const userDetails = user[0];
            const user_Id = userDetails.user_Id;
            const userTasks = await getUserTasks(user_Id);
            console.log(userTasks);
            res.status(200).json(userTasks);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserTasks = async (user_id) => {
    try {
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
        return result;
    } catch (error) {
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
        const user = await userCollection.insertOne(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateTask = async (req, res, id) => {
    try {
        const { id } = req.params;
        const updateTask = await taskCollection.updateMany({ "_id": new ObjectId(id) }, { $set: { "title": `${req.body.title}`, "completed": `${req.body.completed}`, "priority": `${req.body.priority}` } }, {
            new: true,
        });
        res.status(200).json({ updateTask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskCollection.deleteOne({ "_id": new ObjectId(id) });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const { userId } = req.params;
        const task = await taskCollection.insertOne(req.body);
        res.status(201).send(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
