import express from "express"
import { getAllUsers, getTask, getUserById, createUser, updateTask, getUserByUserName, deleteTask, createTask } from "./controller/controller.js";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 11243;

app.get('/users', getAllUsers);

app.get("/users/:userName", getUserByUserName);

app.get("/tasks/:id", getTask)

app.post("/users", createUser)

app.post("/tasks/:userId", createTask)

app.put("/tasks/:id", updateTask)

app.delete("/tasks/:id", deleteTask)

app.listen(PORT, () => { console.log("Port running on : " + PORT); });