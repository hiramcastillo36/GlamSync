const Salon = require('../models/Salon');
const ObjectId = require('mongoose').Types.ObjectId;
const { UserRepository } = require('./user');


class SalonRepository {
  async create(salonData) {
    try {
      const salon = new Salon(salonData);

      await UserRepository.update(salonData.administratorId, {
        $push: { managedSalons: salon._id }
      });

      await UserRepository.update(salonData.administratorId, {
        role: 'owner'
      });

      return await salon.save();
    } catch (error) {
      throw new Error(`Error creating salon: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid salon ID');
      }
      return await Salon.findById(id)
        .populate('administratorId', 'name email');
    } catch (error) {
      throw new Error(`Error getting salon: ${error.message}`);
    }
  }

  async update(id, salonData) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid salon ID');
      }

      // Validate required fields if they are being updated
      if (salonData.name === '' || salonData.phone === '' || salonData.description === '') {
        throw new Error('Required fields cannot be empty');
      }

      const salon = await Salon.findByIdAndUpdate(
        id,
        { $set: salonData },
        { new: true, runValidators: true }
      ).populate('administratorId', 'name email');

      if (!salon) {
        throw new Error('Salon not found');
      }

      return salon;
    } catch (error) {
      throw new Error(`Error updating salon: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid salon ID');
      }

      const salon = await Salon.findByIdAndDelete(id);

      if (!salon) {
        throw new Error('Salon not found');
      }

      return salon;
    } catch (error) {
      throw new Error(`Error deleting salon: ${error.message}`);
    }
  }

  async getAll(query = {}) {
    try {
      return await Salon.find(query);
    } catch (error) {
      throw new Error(`Error getting salons: ${error.message}`);
    }
  }

  async updateRating(id, rating, ratingCount) {
    try {
      return await Salon.findByIdAndUpdate(
        id,
        {
          $set: {
            rating: rating,
            ratingCount: ratingCount
          }
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating rating: ${error.message}`);
    }
  }
}

const salonRepository = new SalonRepository();

module.exports = {
  salonRepository
};
