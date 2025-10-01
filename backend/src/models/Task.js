import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying by date
taskSchema.index({ date: 1 });
taskSchema.index({ completed: 1 });

export default mongoose.model('Task', taskSchema);
