import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    testTitle: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        selectedOption: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }],
    completedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('TestResult', testResultSchema); 