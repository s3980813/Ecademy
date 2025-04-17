import express from 'express';
import { 
    getTestResultsByStudent, 
    submitTestResult, 
} from '../controllers/testResultController.js';

const router = express.Router();

// Get test results for a student
router.get('/student/:studentId', getTestResultsByStudent);

// Submit test results
router.post('/submit', submitTestResult);


export default router; 