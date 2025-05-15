const Salon = require('../models/Salon');
const ObjectId = require('mongoose').Types.ObjectId;

class SalonRepository {
  async create(salonData) {
    const salon = new Salon(salonData);
    return await salon.save();
  }

  async getAll() {
    return await Salon.find({ isActive: true });
  }

  async getById(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return await Salon.findById(id);
  }

  async update(id, salonData) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return await Salon.findByIdAndUpdate(id, salonData, { new: true });
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return await Salon.findByIdAndDelete(id);
  }
}

const salonRepository = new SalonRepository();

module.exports = {
    salonRepository
};
