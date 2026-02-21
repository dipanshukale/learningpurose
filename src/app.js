import express from "express";
import cors from "cors";
import indexRoute from "../src/routes/index.route.js"
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//health route
app.get("/", (req,res) => {
    res.send("AI server is running.... 🚀🌐");
});

//route declaration
app.use("/api/v1",indexRoute);


app.use(errorHandler);


export default app;