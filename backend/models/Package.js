const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    salonId: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    creationDate: Date,
    isActive: Boolean
});

module.exports = mongoose.model('Package', PackageSchema);
