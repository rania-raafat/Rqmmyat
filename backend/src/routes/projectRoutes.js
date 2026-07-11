import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { authorize } from "../middleware/authorize.js";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/" , getProjects);
router.get("/:id" , getProjectById);
router.post("/",isAuth ,authorize("super_admin", "admin"), createProject);
router.put("/:id",isAuth ,authorize("super_admin", "admin"), updateProject);
router.delete("/:id",isAuth ,authorize("super_admin"), deleteProject);

export default router;