const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
let Blog = require('./models/blog');
const config = require('./utils/config');
const logger = require('./utils/logger');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
        response.status(201).json(result);
    });
});

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
