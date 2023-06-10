import express from "express";
import { examHistoryController } from "../controllers/examHistory.controller.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/exam_histories", auth , examHistoryController.createHistory);
router.get("/exam_histories/get_by_user", auth , examHistoryController.getList);
router.get("/exam_histories/get_by_exam/:id", auth , examHistoryController.getListById);

export default router;
