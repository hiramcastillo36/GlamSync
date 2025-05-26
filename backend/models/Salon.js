const mongoose = require('mongoose');
const Service = require('./Service');
const Package = require('./Package');

const imageSchema = new mongoose.Schema({
    name: String,
    contentType: String,
    image: Buffer
  });

const SalonSchema = new mongoose.Schema({
  administratorId: mongoose.Schema.Types.ObjectId,
  name: String,
  address: Object,
  phone: String,
  description: String,
  workingHours: Object,
  image: String,
  rating: Object,
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  packages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  }],
  registerDate: Date,
  isActive: Boolean
});



module.exports = mongoose.model('Salon', SalonSchema);
