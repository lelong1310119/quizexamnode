import { Questions } from "../models/quesiton.model.js"


export const questionService = {
    create: async (content, status, answers, userid) => {
        const newQuestion = new Questions({
            content: content,
            status: status,
            answers: answers,
            user: userid
        })
        await newQuestion.save();
        return newQuestion;
    },

    delete: async (questionId, userId) => {
        const question = await Questions.findOne({_id: questionId, user: userId})
        if(question && question.status == "0") throw Error("Không thể xóa câu hỏi đã công khai")
        const result = await Questions.findOneAndDelete({_id: questionId, user: userId})
        return result;
    },

    update: async (questionId, userId, content, status, answers) => {
        const question = await Questions.findOne({_id: questionId, user: userId})
        if(question && question.status == "0") throw Error("Không thể sửa câu hỏi đã công khai")
        const updatQuestion = await Questions.findOneAndUpdate(
            {
                _id: questionId,
                user: userId,
            },
            {
                content: content,
                status: status,
                answers: answers
            })

        return updatQuestion;
    },

    getList: async (userId) => {
        const questions = await Questions.find({user: userId})
        return questions;
    },

    getListActive: async () => {
        const questions = await Questions.find({status: "0"})
        return questions;
    },

    checkQuestion: async (questionId) => {
        const question = await Questions.findOne({
            _id: questionId,
            status: "0"
        })
        if (question) return true;
        return false;
    }
}