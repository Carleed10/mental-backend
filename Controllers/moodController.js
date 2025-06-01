const Mood = require('../Models/moodModel');

const addMood = async (req, res) => {
  const { userId, mood, note } = req.body;

  if (!userId || !mood) {
    return res.status(400).json({ message: 'User ID and mood are required' });
  }

  try {
    const newMood = await Mood.create({ userId, mood, note });
    return res.status(201).json({ message: 'Mood recorded', mood: newMood });
  } catch (error) {
    return res.status(500).json({ message: 'Error saving mood', error: error.message });
  }
};

const getMoodHistory = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const moods = await Mood.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(moods);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching moods', error: error.message });
  }
};

module.exports = { addMood, getMoodHistory };
