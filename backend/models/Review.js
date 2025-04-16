const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  salonId: mongoose.Schema.Types.ObjectId,
  appointmentId: mongoose.Schema.Types.ObjectId,
  employeeId: mongoose.Schema.Types.ObjectId,
  userInfo: Object,
  salonInfo: Object,
  serviceInfo: Object,
  employeeInfo: Object,
  rating: Number,
  comment: String,
  creationDate: Date,
  isVerified: Boolean
});

module.exports = mongoose.model('Review', ReviewSchema);
