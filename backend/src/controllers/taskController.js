import Task from '../models/Task.js';

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1, time: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks by date
export const getTasksByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const tasks = await Task.find({ date }).sort({ time: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all task dates
export const getTaskDates = async (req, res) => {
  try {
    const dates = await Task.distinct('date');
    res.json(dates.sort().reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { date, name, time } = req.body;
    
    const task = new Task({
      date,
      name,
      time,
      completed: false
    });
    
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle task completion
export const toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task.completed = !task.completed;
    const updatedTask = await task.save();
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
