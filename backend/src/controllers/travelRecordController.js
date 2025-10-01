import TravelRecord from '../models/TravelRecord.js';

// Get all travel records
export const getAllTravelRecords = async (req, res) => {
  try {
    const records = await TravelRecord.find().sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get travel records by month
export const getRecordsByMonth = async (req, res) => {
  try {
    const { month } = req.params;
    const records = await TravelRecord.find({ month }).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available months
export const getAvailableMonths = async (req, res) => {
  try {
    const months = await TravelRecord.distinct('month');
    res.json(months.sort().reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new travel record
export const createTravelRecord = async (req, res) => {
  try {
    const { date, customerName, distance, petrolAmount, totalFare } = req.body;
    
    // Calculate month from date
    const dateObj = new Date(date);
    const month = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
    
    const record = new TravelRecord({
      date,
      customerName,
      distance,
      petrolAmount,
      totalFare,
      month
    });
    
    const savedRecord = await record.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a travel record
export const deleteTravelRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await TravelRecord.findByIdAndDelete(id);
    
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Travel record not found' });
    }
    
    res.json({ message: 'Travel record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
