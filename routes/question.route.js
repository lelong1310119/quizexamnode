import express from "express";
import { questionController } from "../controllers/question.controller.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/questions/create", auth , questionController.createQuestion);
router.get("/questions/getbyuser", auth , questionController.getList);
router.patch("/questions/update", auth , questionController.updateQuestion);
router.delete("/questions/delete", auth , questionController.deleteQuesiton);

export default router;
