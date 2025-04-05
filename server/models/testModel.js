import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [QuestionSchema],
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    mode: { 
      type: String, 
      enum: ['public', 'assigned', 'private'], 
      default: 'private' 
    },
    assignedStudentsId: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }]
});

const Test = mongoose.model('Test', TestSchema);
export default Test;