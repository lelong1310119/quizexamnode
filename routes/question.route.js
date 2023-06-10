import express from "express";
import { questionController } from "../controllers/question.controller.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/questions", auth , questionController.createQuestion);
router.get("/questions/get_by_user", auth , questionController.getList);
router.get("/questions/get_all", auth , questionController.getListActive);
router.patch("/questions", auth , questionController.updateQuestion);
router.delete("/questions/:id", auth , questionController.deleteQuesiton);

export default router;
