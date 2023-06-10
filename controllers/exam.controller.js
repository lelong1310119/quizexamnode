import { examService } from "../services/exam.service.js";
import { questionService } from "../services/question.service.js";

export const examController = {
    createExam: async (req, res)  => {
        try {
            const {name, status, questions, time} = req.body;
            if(name == null || name.trim() == "") return res.status(422).json({msg: "Tên đề thi trống"})
            if(status != "0" && status != "1") return res.status(422).json({msg: "status phải là chuỗi có giá trị 0 hoặc 1"})
            if(!Array.isArray(questions)) return res.status(422).json({msg: "Question truyền vào phải là một mảng"})
            try {
                var check = true;
                questions.forEach(async (item) => {
                   if (!await questionService.checkQuestion(item)) {
                    check = false;
                    return;
                   }
                });
                if (!check) return res.status(422).json({msg: "Danh sách câu hỏi truyền vào không hợp lệ"})
            } catch (err) {
                return res.status(422).json({msg: "Dữ liệu câu hỏi truyền vào không hợp lệ"})
            }
            const newExam = await examService.create(name, status, questions, time, req.user._id);
            return res.status(201).json(
                {
                    msg: "Đã tạo thành công đề thi",
                    exam: {
                        ...newExam._doc,
                        user: req.user
                    }
                }
            )
        } catch(err) {
            return res.status(400).json({msg: err.message})
        }
    },

    updateExam: async (req, res) => {
        try {
            const {examId, name, status, questions, time} = req.body;
            if(name == null || name.trim() == "") return res.status(422).json({msg: "Tên đề thi trống"})
            if(status != "0" && status != "1") return res.status(422).json({msg: "status phải là chuỗi có giá trị 0 hoặc 1"})
            if(!Array.isArray(questions)) return res.status(422).json({msg: "Question truyền vào phải là một mảng"})
            try {
                var check = true;
                questions.forEach(async (item) => {
                   if (!await questionService.checkQuestion(item)) {
                    check = false;
                    return;
                   }
                });
                if (!check) return res.status(422).json({msg: "Danh sách câu hỏi truyền vào không hợp lệ"})
            } catch (err) {
                return res.status(422).json({msg: "Dữ liệu câu hỏi truyền vào không hợp lệ"})
            }
            const updateExam = await examService.update(examId, req.user._id, name, status, questions, time);
            return res.status(201).json(
                {
                    msg: "Đã sửa thành công đề thi",
                    exam: {
                        ...updateExam._doc,
                        user: req.user
                    }
                }
            )
        } catch(err) {
            return res.status(400).json({msg: err.message})
        }
    },

    deleteExam: async (req, res) => {
        try {
            const examId = req.params.id;
            const deleteExam = await examService.delete(examId, req.user._id)
            if (!deleteExam) return res.status(400).json({msg: "id exam truyền vào không hợp lệ"})
            return res.status(200).json({msg: "Đã xóa thành công đề thi"})
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },

    getList: async(req, res) => {
        try {
            const listExam = await examService.getList(req.user._id);
            return res.status(200).json(listExam);
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },

    getListActive: async(req, res) => {
        try {
            const listExam = await examService.getListActive();
            return res.status(200).json(listExam);
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },

    getById: async(req, res) => {
        try {
            const examId = req.params.id;
            const Exam = await examService.getbyId(examId);
            return res.status(200).json(Exam);
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    }
}