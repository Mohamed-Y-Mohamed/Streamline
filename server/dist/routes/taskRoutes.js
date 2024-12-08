"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const routes = (0, express_1.Router)();
routes.get("/", taskController_1.getTasks);
exports.default = routes;
