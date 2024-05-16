const mongoose = require('mongoose');
const password = process.argv[2];

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
