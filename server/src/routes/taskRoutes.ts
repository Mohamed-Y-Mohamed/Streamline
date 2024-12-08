import { Router } from "express";
import {getTasks} from "../controllers/taskController";

const routes = Router();


routes.get("/", getTasks);


export default routes;