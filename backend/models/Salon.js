const mongoose = require('mongoose');

const SalonSchema = new mongoose.Schema({
  administratorId: mongoose.Schema.Types.ObjectId,
  name: String,
  address: Object,
  phone: String,
  description: String,
  workingHours: Object,
  images: Array,
  rating: Object,
  services: Array,
  registerDate: Date,
  isActive: Boolean
});

module.exports = mongoose.model('Salon', SalonSchema);
