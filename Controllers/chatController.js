// Controllers/chatController.js
const axios = require("axios");
const Chat = require("../Models/chatModel");
const detectMood = require("../Utils/moodDetector");

const chatWithAI = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; // JWT payload should include id

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const mood = detectMood(message);

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-sonnet-20240229",
        messages: [
          {
            role: "system",
            content:
              "You are a kind and supportive mental health assistant. Provide emotional support and encouragement.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 700,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Mental Health Chatbot",
        },
      }
    );

    const aiReply = response.data.choices[0].message.content;

    await Chat.findOneAndUpdate(
      { userId },
      {
        $push: {
          messages: [
            { sender: "user", content: message },
            { sender: "ai", content: aiReply },
          ],
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ reply: aiReply, mood });
  } catch (error) {
    console.error("Chat error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Failed to get AI response" });
  }
};

module.exports = { chatWithAI };
