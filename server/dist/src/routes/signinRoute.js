"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authcontroller_1 = require("../controllers/authcontroller");
const router = (0, express_1.Router)();
router.post("/register", authcontroller_1.registerUser);
router.post("/google-signin", authcontroller_1.googleSignIn);
router.post("/signin", authcontroller_1.signInUser);
router.post("/signout", authcontroller_1.signOut);
router.get("/verify", authcontroller_1.verifySession);
// Add the user details route
router.get("/user", authcontroller_1.getUserDetails);
exports.default = router;
