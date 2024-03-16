const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
