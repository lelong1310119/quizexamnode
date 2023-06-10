import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
            required: true,
        },
        user: {type: mongoose.Types.ObjectId, ref: "Users"},
        answers: [{content: {
            type: String,
            trim: true,
            required: true,
        },
        isRight: {
            type: Boolean,
            required: true,
        }
        }]
    },
    {
        timestamps: true,
    }
)

export const Questions = mongoose.model("Questions", questionSchema);