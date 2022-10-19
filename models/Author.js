const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    timestamp: { type: String, required: true },
    blogs: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
})

module.exports = mongoose.model('Author', AuthorSchema);