const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  role: {
    type: String,
    enum: ['admin', 'client', 'employee'],
    default: 'client',
  },
  managedSalons: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model('User', UserSchema);
