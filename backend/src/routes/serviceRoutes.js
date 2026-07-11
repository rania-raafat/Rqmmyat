import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { authorize } from "../middleware/authorize.js";

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/" , getServices);

router.get("/:id" , getServiceById);

router.post("/",isAuth ,authorize("super_admin", "admin"), createService);

router.put("/:id",isAuth ,authorize("super_admin", "admin"), updateService);

router.delete("/:id",isAuth ,authorize("super_admin"), deleteService);

export default router;