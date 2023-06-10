import { examService } from "../services/exam.service.js";
import { examHistoryService } from "../services/examhistory.service.js";

export const examHistoryController = {
    createHistory: async (req, res)  => {
        try {
            const {examId, timeFinish, totalRight} = req.body;
            var exam = await examService.getbyId(examId)
            if (!exam) return res.status(422).json({msg: "id exam truyền vào không hợp lệ"})
            var totalQuestion = exam.questions.length;
            if (isNaN(timeFinish) || exam.time < timeFinish || timeFinish <= 0) return res.status(422).json({msg: "TimeFinish phải là số, nhỏ hơn time của exam và lớn hơn 0"})
            if (isNaN(totalRight) || totalQuestion % 1 !== 0 || totalQuestion < totalRight || totalRight < 0) return res.status(422).json({msg: "TotalRight phải là số nguyên, nhỏ hơn tổng số câu hỏi của exam và lớn hơn hoặc bằng 0"})
            const newHistory = await examHistoryService.create(examId, req.user._id, timeFinish, totalRight, totalQuestion, totalRight/totalQuestion * 10);
            return res.status(201).json(
                {
                    msg: "Đã hoàn thành bài thi",
                    history: {
                        ...newHistory._doc,
                        user: req.user
                    }
                }
            )
        } catch(err) {
            return res.status(400).json({msg: err.message})
        }
    },

    
    getList: async(req, res) => {
        try {
            const listHistory = await examHistoryService.getList(req.user._id);
            return res.status(200).json(listHistory);
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },

    getListById: async(req, res) => {
        try {
            const examId = req.params.id
            const listHistory = await examHistoryService.getbyId(examId);
            return res.status(200).json(listHistory);
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    }
}