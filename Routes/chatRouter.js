const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../Controllers/chatController')



router.post('/chatAI', chatWithAI);

module.exports = router;
