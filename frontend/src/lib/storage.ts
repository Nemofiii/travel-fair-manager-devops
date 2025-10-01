// Re-export types from API for backward compatibility
export type { TravelRecord, Task } from './api';

// Import API functions
import { travelRecordsAPI, tasksAPI } from './api';

// Travel Records - now using API calls
export const getTravelRecords = async () => {
  try {
    return await travelRecordsAPI.getAll();
  } catch (error) {
    console.error('Failed to fetch travel records:', error);
    return [];
  }
};

export const saveTravelRecord = async (record: Omit<TravelRecord, "_id" | "month" | "createdAt" | "updatedAt">) => {
  try {
    return await travelRecordsAPI.create(record);
  } catch (error) {
    console.error('Failed to save travel record:', error);
    throw error;
  }
};

export const getRecordsByMonth = async (month: string) => {
  try {
    return await travelRecordsAPI.getByMonth(month);
  } catch (error) {
    console.error('Failed to fetch records by month:', error);
    return [];
  }
};

export const getAvailableMonths = async () => {
  try {
    return await travelRecordsAPI.getAvailableMonths();
  } catch (error) {
    console.error('Failed to fetch available months:', error);
    return [];
  }
};

export const deleteRecord = async (id: string) => {
  try {
    await travelRecordsAPI.delete(id);
  } catch (error) {
    console.error('Failed to delete record:', error);
    throw error;
  }
};

// Tasks - now using API calls
export const getTasks = async () => {
  try {
    return await tasksAPI.getAll();
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
};

export const saveTask = async (task: Omit<Task, "_id" | "completed" | "createdAt" | "updatedAt">) => {
  try {
    return await tasksAPI.create(task);
  } catch (error) {
    console.error('Failed to save task:', error);
    throw error;
  }
};

export const getTasksByDate = async (date: string) => {
  try {
    return await tasksAPI.getByDate(date);
  } catch (error) {
    console.error('Failed to fetch tasks by date:', error);
    return [];
  }
};

export const toggleTaskCompletion = async (id: string) => {
  try {
    return await tasksAPI.toggleCompletion(id);
  } catch (error) {
    console.error('Failed to toggle task completion:', error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    await tasksAPI.delete(id);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

export const getTaskDates = async () => {
  try {
    return await tasksAPI.getDates();
  } catch (error) {
    console.error('Failed to fetch task dates:', error);
    return [];
  }
};
