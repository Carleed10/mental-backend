const express = require('express');
const chatRouter = express.Router();
const { chatWithAI } = require('../Controllers/chatController');
const verifyToken = require('../Middleware/verifyToken');


chatRouter.post('/chatAI', verifyToken, chatWithAI);

module.exports = chatRouter;
