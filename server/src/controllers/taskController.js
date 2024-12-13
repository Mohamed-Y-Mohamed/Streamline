"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = exports.updateTaskStatus = exports.createTask = exports.getTasks = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var getTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, tasks, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.query.projectId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.findMany({
                        where: {
                            projectId: Number(projectId),
                        },
                        include: {
                            author: true,
                            assignee: true,
                            comments: true,
                            attachments: true,
                        },
                    })];
            case 2:
                tasks = _a.sent();
                res.json(tasks);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res
                    .status(500)
                    .json({ message: "Error retrieving tasks: ".concat(error_1.message) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTasks = getTasks;
var createTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, newTask, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, status = _a.status, priority = _a.priority, tags = _a.tags, startDate = _a.startDate, dueDate = _a.dueDate, points = _a.points, projectId = _a.projectId, authorUserId = _a.authorUserId, assignedUserId = _a.assignedUserId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.create({
                        data: {
                            title: title,
                            description: description,
                            status: status,
                            priority: priority,
                            tags: tags,
                            startDate: startDate,
                            dueDate: dueDate,
                            points: points,
                            projectId: projectId,
                            authorUserId: authorUserId,
                            assignedUserId: assignedUserId,
                        },
                    })];
            case 2:
                newTask = _b.sent();
                res.status(201).json(newTask);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res
                    .status(500)
                    .json({ message: "Error creating a task: ".concat(error_2.message) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createTask = createTask;
var updateTaskStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, status, updatedTask, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.taskId;
                status = req.body.status;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.update({
                        where: {
                            id: Number(taskId),
                        },
                        data: {
                            status: status,
                        },
                    })];
            case 2:
                updatedTask = _a.sent();
                res.json(updatedTask);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ message: "Error updating task: ".concat(error_3.message) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateTaskStatus = updateTaskStatus;
var getUserTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tasks, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.findMany({
                        where: {
                            OR: [
                                { authorUserId: Number(userId) },
                                { assignedUserId: Number(userId) },
                            ],
                        },
                        include: {
                            author: true,
                            assignee: true,
                        },
                    })];
            case 2:
                tasks = _a.sent();
                res.json(tasks);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res
                    .status(500)
                    .json({ message: "Error retrieving user's tasks: ".concat(error_4.message) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserTasks = getUserTasks;
