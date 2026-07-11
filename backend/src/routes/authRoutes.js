import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  getAdmin,
  registerAdmin,
  login,
  registerSuperAdmin
} from "../controllers/authController.js";

const router = express.Router();

router.get(
  "/admin",
  getAdmin
);

router.post(
  "/register-admin",
  registerAdmin
);

router.post(
  "/register-super-admin",
  registerSuperAdmin
);

router.post(
  "/login",
  login
);

export default router;