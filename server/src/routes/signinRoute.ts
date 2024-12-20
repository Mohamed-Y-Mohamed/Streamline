import { Router } from "express";
import { registerUser, googleSignIn, signOut, signInUser, verifySession, getUserDetails } from "../controllers/authcontroller";

const router = Router();

router.post("/register", registerUser);
router.post("/google-signin", googleSignIn);
router.post("/signin", signInUser);
router.post("/signout", signOut);
router.get("/verify", verifySession);

// Add the user details route
router.get("/user", getUserDetails);

export default router;
