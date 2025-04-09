import express from 'express';
import { 
    getTestResultsByStudent, 
    submitTestResult, 
    getAvailableTests 
} from '../controllers/testResultController.js';

const router = express.Router();

// Get test results for a student
router.get('/student/:studentId', getTestResultsByStudent);

// Submit test results
router.post('/submit', submitTestResult);

// Get available tests for a student
router.get('/available/:studentId', getAvailableTests);

export default router; 