import { Questions } from "../models/quesiton.model.js"


export const questionService = {
    create: async (content, answers, userid) => {
        const newQuestion = new Questions({
            content: content,
            answers: answers,
            user: userid
        })
        await newQuestion.save();
        return newQuestion;
    },

    delete: async (questionId, userId) => {
        const result = await Questions.findOneAndDelete({_id: questionId, user: userId})
        return result;
    },

    update: async (questionId, userId, content, answers) => {
        const updatQuestion = await Questions.findOneAndUpdate(
            {
                _id: questionId,
                user: userId,
            },
            {
                content: content,
                answers: answers
            })

        return updatQuestion;
    },

    getList: async (userId) => {
        const questions = await Questions.find({user: userId})
        return questions;
    }
}