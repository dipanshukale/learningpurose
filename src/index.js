import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import { connectDB } from "./db/db.index.js";


dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB();

server.listen(PORT,()=> {
    console.log(`server is running on port ${PORT} ⚙️  🚀`);
})