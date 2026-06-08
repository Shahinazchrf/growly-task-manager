const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['study', 'work', 'personal'], required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  module: { type: String, default: '' },
  project: { type: String, default: '' },
  notes: { type: String, default: '' },
  budget: { type: Number, default: 0 },
  collaborators: [{ type: String }],
  clientNotes: { type: String, default: '' },
  reminder: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
