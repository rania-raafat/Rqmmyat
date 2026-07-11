import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { authorize } from "../middleware/authorize.js";

import {
  getTeam,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/" , getTeam);
router.get("/:id" , getTeamMemberById);
router.post("/",isAuth ,authorize("super_admin", "admin"), createTeamMember);
router.put("/:id",isAuth ,authorize("super_admin", "admin"), updateTeamMember);
router.delete("/:id",isAuth ,authorize("super_admin"), deleteTeamMember);

export default router;