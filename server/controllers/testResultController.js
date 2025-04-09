import TestResult from '../models/testResultModel.js';
import Test from '../models/testModel.js';

// Get test results for a student
export const getTestResultsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const results = await TestResult.find({ studentId })
            .sort({ completedAt: -1 });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching test results", error });
    }
};

// Submit test results
export const submitTestResult = async (req, res) => {
    try {
        const { studentId, testId, answers } = req.body;

        // Get the test to calculate score
        const test = await Test.findById(testId).populate('questions');
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        // Calculate score
        let correctAnswers = 0;
        const processedAnswers = answers.map(answer => {
            const question = test.questions.find(q => q._id.toString() === answer.questionId);
            const isCorrect = question.correctAnswer === answer.selectedOption;
            if (isCorrect) correctAnswers++;
            return {
                ...answer,
                isCorrect
            };
        });

        const score = (correctAnswers / test.questions.length) * 100;

        // Create test result
        const testResult = new TestResult({
            studentId,
            testId,
            testTitle: test.title,
            score,
            totalQuestions: test.questions.length,
            correctAnswers,
            answers: processedAnswers
        });

        const savedResult = await testResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ message: "Error submitting test result", error });
    }
};

// Get available tests for a student
export const getAvailableTests = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Get all tests
        const allTests = await Test.find().populate('teacherId', 'name');

        // Get completed tests by this student
        const completedTests = await TestResult.find({ studentId }).select('testId');

        // Filter out completed tests
        const availableTests = allTests.filter(test => 
            !completedTests.some(completed => completed.testId.toString() === test._id.toString())
        );

        res.status(200).json(availableTests);
    } catch (error) {
        res.status(500).json({ message: "Error fetching available tests", error });
    }
}; 