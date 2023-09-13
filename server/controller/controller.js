import ToDoCollection from "../models/UserSchema.js";
import TaskCollection from "../models/TaskSchema.js";
import Connection from "../database/db.js";
Connection();

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

export const getUserByUserName = async (req, res) => {
    try {
        console.log("inside getUserByUserName")
        console.log(req.params);
        const { userName } = req.params;
        const user = await ToDoCollection.find({ userName: userName });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
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
        const user = await ToDoCollection.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskCollection.findOneAndUpdate({ "_id": id }, req.body, {
            new: true,
        });
        res.status(200).json({ task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

