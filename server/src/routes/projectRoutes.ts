import { Router } from "express";
import {createProject, getProjects} from "../controllers/projectController";

const routes = Router();


routes.get("/", getProjects);
routes.post("/", createProject);


export default routes;