import { Router } from "express";
import { getUserDetails } from "../controllers/usersController";

const router = Router();

router.get("/details", getUserDetails);

export default router;
