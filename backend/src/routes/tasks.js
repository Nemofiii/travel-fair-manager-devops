import express from 'express';
import {
  getAllTasks,
  getTasksByDate,
  getTaskDates,
  createTask,
  toggleTaskCompletion,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/', getAllTasks);

// GET /api/tasks/dates - Get all task dates
router.get('/dates', getTaskDates);

// GET /api/tasks/date/:date - Get tasks by date
router.get('/date/:date', getTasksByDate);

// POST /api/tasks - Create a new task
router.post('/', createTask);

// PATCH /api/tasks/:id/toggle - Toggle task completion
router.patch('/:id/toggle', toggleTaskCompletion);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

export default router;
