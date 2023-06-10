import { ExamHistories } from "../models/examhistory.model.js";

export const examHistoryService = {
    create: async (examId, userId, timeFinish, totalRight,totalQuestion, totalScore) => {
        const newExamHistory = new ExamHistories({
            exam: examId, 
            user: userId, 
            timeFinish: timeFinish, 
            totalRight: totalRight,
            totalQuestion: totalQuestion, 
            totalScore: totalScore
        })
        await newExamHistory.save();
        return newExamHistory;
    },

   
    getList: async (userId) => {
        const examHistories = await ExamHistories.find({user: userId})
        return examHistories;
    },

    getbyId: async (examId) => {
        const examHistories = await ExamHistories.find({ exam: examId})
        return examHistories;
    }
}