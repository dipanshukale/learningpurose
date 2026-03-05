import express from "express";
import cors from "cors";
import indexRoute from "../src/routes/index.route.js"
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // allow only frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // allow cookies/auth headers
  allowedHeaders: ["Content-Type", "Authorization"],
};


//middleware
app.use(cors(corsOptions));
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