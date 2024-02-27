const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTaskById, updateTask, updateChecklistItemStatus, analyticsOfTask, filterTasks, deleteTask } = require('../controller/task');
const verifyToken = require('../middleware/authMiddleware');

// Create a new task
router.post('/tasks',verifyToken, createTask);

// Get all tasks
router.get('/tasks',verifyToken,getAllTasks);

// Get analytics
router.get('/tasks/analytics',verifyToken, analyticsOfTask);

router.put('/tasks/filter',verifyToken, filterTasks);

// Get a single task by ID
router.get('/tasks/:id', getTaskById);

// Update a task by ID
router.put('/tasks/:id',verifyToken, updateTask);

// Update checklist item completed status
router.put('/tasks/:id/checklist',verifyToken, updateChecklistItemStatus);

//Delete the Task
router.delete('/tasks/:id',verifyToken, deleteTask);


module.exports = router;
