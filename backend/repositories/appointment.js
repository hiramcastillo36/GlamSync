const Appointment = require('../models/Appointment');
const ObjectId = require('mongoose').Types.ObjectId;
const Salon = require('../models/Salon');

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

    async getAppointmentsBySalonId(salonId) {
        return await Appointment.find({ salonId: new ObjectId(salonId) })
            .populate('userId', 'name email')
            .populate('serviceId', 'name price')
            .populate('packageId', 'name price')
            .sort({ appointmentDate: -1, appointmentTime: -1 });
    }

    async getAppointmentsByAdmin(adminId) {
        // Primero obtenemos los salones del administrador
        const salons = await Salon.find({ administratorId: new ObjectId(adminId) });

        if (!salons.length) {
            return [];
        }

        // Obtenemos las citas de todos los salones del administrador
        return await Appointment.find({
            salonId: { $in: salons.map(salon => salon._id) }
        })
        .populate({
            path: 'salonId',
            select: 'name address phone description workingHours'
        })
        .populate({
            path: 'userId',
            select: 'name email phone'
        })
        .populate({
            path: 'serviceId',
            select: 'name price description'
        })
        .populate({
            path: 'packageId',
            select: 'name price description'
        })
        .sort({ appointmentDate: -1, appointmentTime: -1 });
    }
}

const appointmentRepository = new AppointmentRepository();

module.exports = {
    appointmentRepository
};
