const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  salonId: mongoose.Schema.Types.ObjectId,
  serviceId: mongoose.Schema.Types.ObjectId,
  employeeId: mongoose.Schema.Types.ObjectId,
  packageId: mongoose.Schema.Types.ObjectId,
  userInfo: Object,
  salonInfo: Object,
  serviceInfo: Object,
  employeeInfo: Object,
  packageInfo: Object,
  dateTime: Date,
  status: String,
  notes: String,
  review: Object,
  creationDate: Date,
  updateDate: Date
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
