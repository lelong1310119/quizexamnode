import mongoose from "mongoose";

const examHistorySchema = new mongoose.Schema(
    {
        exam: {type: mongoose.Types.ObjectId, ref: "Exams"},
        user: {type: mongoose.Types.ObjectId, ref: "Users"},
        timeFinish: {
            type: Number,
            required: true
        },
        totalRight: {
            type: Number,
            required: true,
        },
        totalQuestion: {
            type: Number,
            required: true,
        },
        totalScore: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

export const ExamHistories = mongoose.model("ExamHistories", examHistorySchema);