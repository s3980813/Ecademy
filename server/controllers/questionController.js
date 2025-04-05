import Question from "../models/questionModel.js";

// Get all questions by set ID
export const getQuestionsBySet = async (req, res) => {
    try {
        const { questionSetId } = req.query;
        if (!questionSetId) return res.status(400).json({ message: "Missing questionSetId" });

        const questions = await Question.find({ questionSetId });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};

// Get a single question with question ID
export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: "Question not found" });

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Error fetching question", error });
    }
};

// Create new question
export const createQuestion = async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: "Error creating question", error });
    }
};

// Create new questions
export const addMultipleQuestions = async (req, res) => {
    try {
        const { questions } = req.body;

        // Check if questions is an array and contains at least one question
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Invalid input: 'questions' should be a non-empty array" });
        }

        // Insert multiple questions at once using insertMany (this is more efficient than saving each individually)
        const savedQuestions = await Question.insertMany(questions);

        // Respond with the saved questions
        res.status(201).json(savedQuestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) return res.status(404).json({ message: "Question not found" });

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: "Error updating question", error });
    }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) return res.status(404).json({ message: "Question not found" });

        res.status(200).json({ message: "Question successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting question", error });
    }
};
