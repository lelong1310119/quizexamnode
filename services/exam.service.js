import { Exams } from "../models/exam.model.js";

export const examService = {
    create: async (name, status, questions, time, userid) => {
        const newExam = new Exams({
            name: name,
            status: status,
            questions: questions,
            time: time,
            user: userid
        })
        await newExam.save();
        return newExam;
    },

    delete: async (examId, userId) => {
        const exam = await Exams.findOne({_id: examId, user: userId})
        if(exam && exam.status == "0") throw Error("Không thể xóa đề thi đã công khai")
        const result = await Exams.findOneAndDelete({_id: examId, user: userId})
        return result;
    },

    update: async (examId, userId, name, status, questions, time) => {
        const exam = await Exams.findOne({_id: examId, user: userId})
        if(exam && exam.status == "0") throw Error("Không thể sửa đề thi đã công khai")
        const updateExam = await Exams.findOneAndUpdate(
            {
                _id: examId,
                user: userId,
            },
            {
                name: name,
                status: status,
                questions: questions,
                time: time,
            })

        return updateExam;
    },

    getList: async (userId) => {
        const exams = await Exams.find({user: userId})
        return exams;
    },

    getListActive: async () => {
        const exams = await Exams.find({status: "0"})
        return exams;
    },

    getbyId: async (examId) => {
        const exam = await Exams.findOne({ _id: examId, status: "0"}).populate("questions")

        return exam;
    }
}