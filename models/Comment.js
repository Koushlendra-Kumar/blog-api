const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name: { type: String },
    comment: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' ,required: true },
    isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model('Comment', CommentSchema);