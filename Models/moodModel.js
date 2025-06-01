const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  mood: { type: String, required: true }, // e.g., "happy", "sad", "anxious", etc.
  note: { type: String }, // optional note user can add
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mood', moodSchema);
