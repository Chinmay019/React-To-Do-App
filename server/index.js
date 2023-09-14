import express from "express"
import { getAllUsers, getTask, getUserById, createUser, updateTask, getUserByUserName, deleteTask, updateUserTasks, createTask } from "./controller/controller.js";
// import router from "./routes/route.js";
import cors from "cors";
const app = express();

app.use(express.json());

// app.use(express.urlencoded());

app.use(cors());

const PORT = process.env.PORT || 11243;

app.get('/users', getAllUsers);

// app.get("/users/:id", getUserById)

app.get("/users/:userName", getUserByUserName);

app.get("/tasks/:id", getTask)

app.post("/users", createUser)

app.post("/users/:userName", createTask)

app.put("/tasks/:id", updateTask)

app.put("/users/:userName/:id", updateUserTasks)

app.delete("/tasks/:id", deleteTask)

app.listen(PORT, () => { console.log("Port running on : " + PORT); });