const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  salonId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  includedServices: Array,
  includedProducts: Array,
  regularPrice: Number,
  offerPrice: Number,
  discountPercentage: Number,
  totalDuration: Number,
  image: String,
  isAvailable: Boolean,
  isFeatured: Boolean,
  creationDate: Date,
  updateDate: Date
});

module.exports = mongoose.model('Package', PackageSchema);
