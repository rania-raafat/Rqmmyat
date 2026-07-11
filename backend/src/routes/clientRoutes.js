import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { authorize } from "../middleware/authorize.js";

import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/" , getClients);
router.get("/:id" , getClientById);
router.post("/",isAuth , authorize("super_admin", "admin"), createClient);
router.put("/:id",isAuth ,authorize("super_admin", "admin"), updateClient);
router.delete("/:id",isAuth ,authorize("super_admin"), deleteClient);

export default router;