import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { authorize } from "../middleware/authorize.js";

import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from "../controllers/contactController.js";

const router = express.Router();

router.get("/" ,isAuth ,authorize("super_admin", "admin"), getContacts);
router.get("/:id" ,isAuth ,authorize("super_admin", "admin"), getContactById);
router.post("/" , createContact);
router.put("/:id",isAuth ,authorize("super_admin", "admin"), updateContact);
router.delete("/:id",isAuth ,authorize("super_admin"), deleteContact);

export default router;