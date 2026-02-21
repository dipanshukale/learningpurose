import dotenv from "dotenv";
import app from "./app.js";
import http from "http";


dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT,()=> {
    console.log(`server is running on port ${PORT} ⚙️  🚀`);
})