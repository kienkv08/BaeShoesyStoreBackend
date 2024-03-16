const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Update a post
router.put('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId,  req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete a post


module.exports = router; 
