import express from "express";
import cors from "cors";
import indexRoute from "../src/routes/index.route.js"
import errorHandler from "./middlewares/error.middleware.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const allowedOrigins = [
  "https://agent-ui-alpha-blond.vercel.app/",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
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