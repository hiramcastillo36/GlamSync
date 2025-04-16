const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  salonId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  profilePhoto: String,
  specialties: Array,
  offeredServices: Array,
  biography: String,
  yearsExperience: Number,
  workSchedule: Object,
  rating: Object,
  isActive: Boolean,
  hireDate: Date
});

module.exports = mongoose.model('Employee', EmployeeSchema);
