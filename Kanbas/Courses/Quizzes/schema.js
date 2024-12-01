import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    title: { type: String, required: true },
    course: { type: String, required: true },
    description: String,
    points: { type: Number, default: 100 },
    dueDate: Date,
    availableFromDate: Date,
    availableUntilDate: Date,
    published: { type: Boolean, default: false },
    numberOfQuestions: { type: Number, default: 0 }
}, { collection: "quizzes" });

export default quizSchema;