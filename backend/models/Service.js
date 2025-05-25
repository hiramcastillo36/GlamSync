const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    salonId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    creationDate: Date,
    isActive: Boolean
});

module.exports = mongoose.model('Service', ServiceSchema);
