import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        content: {
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