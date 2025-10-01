import mongoose from 'mongoose';

const travelRecordSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  distance: {
    type: Number,
    required: true,
    min: 0
  },
  petrolAmount: {
    type: Number,
    required: true,
    min: 0
  },
  totalFare: {
    type: Number,
    required: true,
    min: 0
  },
  month: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient querying by month
travelRecordSchema.index({ month: 1 });
travelRecordSchema.index({ date: 1 });

export default mongoose.model('TravelRecord', travelRecordSchema);
