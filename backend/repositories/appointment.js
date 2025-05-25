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

    async update(id, appointmentData) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
    }

    async delete(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Appointment.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }
}

const appointmentRepository = new AppointmentRepository();

module.exports = {
    appointmentRepository
};
