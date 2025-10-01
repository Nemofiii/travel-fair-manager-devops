import express from 'express';
import {
  getAllTravelRecords,
  getRecordsByMonth,
  getAvailableMonths,
  createTravelRecord,
  deleteTravelRecord
} from '../controllers/travelRecordController.js';

const router = express.Router();

// GET /api/travel-records - Get all travel records
router.get('/', getAllTravelRecords);

// GET /api/travel-records/months - Get available months
router.get('/months', getAvailableMonths);

// GET /api/travel-records/month/:month - Get records by month
router.get('/month/:month', getRecordsByMonth);

// POST /api/travel-records - Create a new travel record
router.post('/', createTravelRecord);

// DELETE /api/travel-records/:id - Delete a travel record
router.delete('/:id', deleteTravelRecord);

export default router;
