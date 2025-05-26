const Appointment = require('../models/Appointment');
const ObjectId = require('mongoose').Types.ObjectId;

class AppointmentRepository {
    async create(appointmentData) {
        const appointment = new Appointment(appointmentData);
        return await appointment.save();
    }

    async getAll() {
        return await Appointment.find({ isActive: true });
    }

    async getById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Appointment.findById(id);
    }

    async getAppointmentsByUserId(userId) {
        return await Appointment.find({
            userId: new ObjectId(userId)
        }).populate('salonId', 'name address')
          .populate('serviceId', 'name price')
          .populate('packageId', 'name price')
          .sort({ appointmentDate: -1, appointmentTime: -1 });
    }

    async update(id, appointmentData) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
    }

    async delete(id) {
        return await Appointment.findByIdAndDelete(id);
    }
}

const appointmentRepository = new AppointmentRepository();

module.exports = {
    appointmentRepository
};
