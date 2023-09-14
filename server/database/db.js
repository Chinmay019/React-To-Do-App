// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const user = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// const Connection = () => {
//     const MongoDB_URI = `mongodb+srv://${user}:${password}@todo-app.vb58zfw.mongodb.net/?retryWrites=true&w=majority`;

//     // const client = new MongoClient(MongoDB_URI);
//     // try {
//     //     const connect = await client.connect();
//     //     db = connect.db("test");
//     //     if (db) {
//     //         console.log("Connected to MongoDB");
//     //     }
//     //     return db;
//     // } catch (error) {
//     //     console.log("Following error occurred", error.messages);
//     // }

//     mongoose.connect(MongoDB_URI, { useNewUrlParser: true });

//     mongoose.connection.on("connected", () => {
//         console.log("Connected to MongoDB");
//     })
//     mongoose.connection.on("disconnected", () => {
//         console.log("MongoDB disconnected");
//     })
//     mongoose.connection.on("error", (error) => {
//         console.log("Following error occurred", error.messages);
//     })
// }

// export default Connection;