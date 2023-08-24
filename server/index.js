import express from "express"
import Connection from "./database/db.js";
import To_Do_Collection from "./models/schema.js";
import router from "./routes/route.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 11243;

app.get('/', (req, res) => {
    res.send("testing ");
})

app.use("/test", router);

Connection();

app.post("/todos", async (req, res) => {
    console.log(req.body);
    const todo = new To_Do_Collection(req.body);
    try {
        const newToDo = await todo.save();
        res.status(201).send(newToDo);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

app.listen(PORT, () => { console.log("Port running on : " + PORT); });