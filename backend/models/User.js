const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  registerDate: Date,
  profilePhoto: String,
  isAdmin: Boolean,
  managedSalons: [mongoose.Schema.Types.ObjectId],
  recoveryToken: Object,
  lastAccess: Date
});

module.exports = mongoose.model('User', UserSchema);
