import express from 'express';
import { getAllTests, getTestsByTeacher, getTestsByStudent, getTestById, createTest, deleteTest, updateTest } from '../controllers/testController.js';
const router = express.Router();

// Route to get all tests
router.get('/', getAllTests);

// Route to get tests by teacher ID
router.get('/teacher/:teacherId', getTestsByTeacher);

// Route to get tests by student ID
router.get('/student/:studentId', getTestsByStudent);

// Route to get a test by its ID
router.get('/:id', getTestById);

// Route to create a new test
router.post('/', createTest);

// Route to update a test by its ID
router.put('/:id', updateTest);

// Route to delete a test by its ID
router.delete('/:id', deleteTest);

export default router;