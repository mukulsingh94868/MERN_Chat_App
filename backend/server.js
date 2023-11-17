const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

const PORT = 5000;
const MONGO_URL = 'mongodb+srv://mern_chat_app:mern_chat_app_123@cluster0.t5q7pda.mongodb.net/mern_chat_app';

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('DB connection established');
        app.listen(PORT, () => {
            console.log(`listening on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log('error', error);
    })