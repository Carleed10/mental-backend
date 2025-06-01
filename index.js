const express = require('express');
const userRouter = require('./Routes/userRouter');
const chatRouter = require('./Routes/chatRouter');
const spotifyRouter = require('./Routes/spotifyRouter');

const dbConnect = require('./Config/dbConnect');
const env = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ extended: true, limit: '50mb' }));

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/spotify', spotifyRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
  console.log(`Spotify login available at http://localhost:${PORT}/api/spotify/login`);
});

dbConnect();
