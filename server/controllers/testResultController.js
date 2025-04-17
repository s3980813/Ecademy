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
        const { studentId, testId, answers, score } = req.body;
        // Get the test to calculate score
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        // Create test result
        const testResult = new TestResult({
            studentId,
            testId,
            score,
            answers,
        });
        console.log("Test Result:", testResult);

        const savedResult = await testResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error submitting test result", error });
    }
};