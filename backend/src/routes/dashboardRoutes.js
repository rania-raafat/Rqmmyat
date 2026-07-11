import express from "express";

import { getStats } from "../controllers/dashboardController.js";

import { isAuth } from './../middleware/isAuth.js';
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.get(
  "/stats",
  isAuth,
  authorize("super_admin", "admin"),
  getStats
);

export default router;