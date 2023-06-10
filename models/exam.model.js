import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        status: {
            type: String,
            enum: ["0", "1"],
            required: true,
            default: "1"
        },
        questions: [{ type: mongoose.Types.ObjectId, ref: "Questions" }],
        user: {type: mongoose.Types.ObjectId, ref: "Users"},
        time: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const Exams = mongoose.model("Exams", examSchema);