import { Router } from "express";
import { registerUser, googleSignIn, signOut, signInUser } from "../controllers/authcontroller";

const router = Router();

router.post("/register", registerUser);
router.post("/google-signin", googleSignIn);
router.post("/signin", signInUser);
router.post("/signout", signOut);

export default router;
