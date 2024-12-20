"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const routes = (0, express_1.Router)();
routes.get("/", projectController_1.getProjects);
routes.post("/", projectController_1.createProject);
exports.default = routes;
