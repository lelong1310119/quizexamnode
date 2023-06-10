import { questionService } from "../services/question.service.js";


export const questionController = {
    createQuestion: async (req, res)  => {
        try {
            const {content, answers} = req.body;
            if(content == null || content.trim() == "") return res.status(422).json({msg: "Nội dung câu hỏi trống"})

            try {
                var count = 0;
                var check = true;
                answers.forEach(item => {
                    if (item.content == null || item.content.trim() == "") check = false;
                    if (item.isRight) count++;
                });
                if (!check) return res.status(422).json({msg: "Nội dung câu trả lời trống"})
                if (count != 1) return res.status(422).json({msg: "Một câu hỏi phải có ít nhất một đáp án và chỉ có duy nhât một đáp án đúng"})
            } catch (err) {
                return res.status(422).json({msg: "Dữ liệu các thành phần trong Answers không hợp lệ"})
            }
            const newQuestion = await questionService.create(content, answers, req.user._id);
            return res.status(201).json(
                {
                    msg: "Đã tạo thành công câu hỏi",
                    question: {
                        ...newQuestion._doc,
                        user: req.user
                    }
                }
            )
        } catch(err) {
            return res.status(400).json({msg: err.message})
        }
    },

    updateQuestion: async (req, res) => {
        try {
            const {questionId, content, answers} = req.body;
            if(content == null || content.trim() == "") return res.status(422).json({msg: "Nội dung câu hỏi trống"})

            try {
                var count = 0;
                var check = true;
                answers.forEach(item => {
                    if (item.content == null || item.content.trim() == "") check = false;
                    if (item.isRight) count++;
                });
                if (!check) return res.status(422).json({msg: "Nội dung câu trả lời trống"})
                if (count != 1) return res.status(422).json({msg: "Một câu hỏi phải có ít nhất một đáp án và chỉ có duy nhât một đáp án đúng"})
            } catch (err) {
                return res.status(422).json({msg: "Dữ liệu các thành phần trong Answers không hợp lệ"})
            }
            const updateQuestion = await questionService.update(questionId, req.user._id, content, answers)
            if (!updateQuestion) return res.status(400).json({msg: "id question truyền vào không hợp lệ"})
            return res.status(200).json(
                {
                    msg: "Đã sửa thành công câu hỏi",
                    question: {
                        ...updateQuestion._doc,
                        user: req.user
                    }
                }
            )
        } catch(err) {
            return res.status(400).json({msg: err.message})
        }
    },

    deleteQuesiton: async (req, res) => {
        try {
            const {questionId} = req.body;
            const deleteQuestion = await questionService.delete(questionId, req.user._id)
            if (!deleteQuestion) return res.status(400).json({msg: "id question truyền vào không hợp lệ"})
            return res.status(200).json({msg: "Đã xóa thành công câu hỏi"})
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    },

    getList: async(req, res) => {
        try {
            const listQuestion = await questionService.getList(req.user._id);
            return res.status(200).json(listQuestion);
        } catch (err) {
            return res.status(400).json({msg: err.message})
        }
    }
}