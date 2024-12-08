import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
/** Routes */
// import authRoutes from "./routes/auth";
// import projectRoutes from "./routes/projects";
// import taskRoutes from "./routes/tasks";
// import userRoutes from "./routes/users";
// import teamRoutes from "./routes/teams";
/** configuration */


dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/** Routes */
app.get("/", (req, res) => {
    res.send("home Route");
});
/* Server */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
