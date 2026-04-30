import express from "express";
import {
  index,
  show,
  create,
  update,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", deleteTask);

export default router;
