"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var projectController_1 = require("../controllers/projectController");
var routes = (0, express_1.Router)();
routes.get("/", projectController_1.getProjects);
routes.post("/", projectController_1.createProject);
exports.default = routes;
