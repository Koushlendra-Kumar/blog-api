const mongoose = require('mongoose');

const MailListSchema = new mongoose.Schema({
    email: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now() }
})

module.exports = mongoose.model('MailList', MailListSchema);