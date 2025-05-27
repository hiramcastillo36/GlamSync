const { response, request } = require("express");
const { appointmentRepository } = require("../repositories/appointment");
const { salonRepository } = require("../repositories/salon");

const createAppointment = async (req = request, res = response) => {
    try {
        const {
            salonId,
            serviceId,
            packageId,
            appointmentDate,
            appointmentTime,
            totalPrice
        } = req.body;

        if (serviceId == "") {
            const newAppointment = await appointmentRepository.create({
                userId: req.user._id,
                salonId,
                packageId,
                appointmentDate,
                appointmentTime,
                totalPrice
            });

            res.status(201).json({
                success: true,
                data: newAppointment
            });
        } else {
            const newAppointment = await appointmentRepository.create({
                userId: req.user._id,
                salonId,
                serviceId,
                appointmentDate,
                appointmentTime,
                totalPrice,
                rated: false
            });

            res.status(201).json({
                success: true,
                data: newAppointment
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message || 'Error creating appointment'
        });
    }
};

const getAppointmentsByUserId = async (req = request, res = response) => {
    const appointments = await appointmentRepository.getAppointmentsByUserId(req.user._id.toString());

    console.log(req.user._id.toString());

    console.log(appointments);

    res.json({
        success: true,
        data: appointments
    });
};

const deleteAppointment = async (req = request, res = response) => {
    const { id } = req.params;
    const appointment = await appointmentRepository.delete(id);
    res.json({
        success: true,
        data: appointment
    });
};

const getAppointmentsBySalonId = async (req = request, res = response) => {
    const { id } = req.params;
    const appointments = await appointmentRepository.getAppointmentsBySalonId(id);
    res.json({
        success: true,
        data: appointments
    });
};

const getAppointmentsByAdmin = async (req = request, res = response) => {
    const appointments = await appointmentRepository.getAppointmentsByAdmin(
        req.user._id.toString()
    );
    res.json({
        success: true,
        data: appointments
    });
};

const updateAppointmentDate = async (req = request, res = response) => {
    const { id } = req.params;
    const { appointmentDate, appointmentTime } = req.body;
    const appointment = await appointmentRepository.updateDate(id, appointmentDate, appointmentTime);
    res.json({
        success: true,
        data: appointment
    });
};

const markAsCompleted = async (req = request, res = response) => {
    const { id } = req.params;
    const appointmentData = await appointmentRepository.getById(id);
    const salon = await salonRepository.getById(appointmentData.salonId);

    if (req.user._id.toString() !== salon.administratorId.toString()) {
        return res.status(403).json({
            success: false,
            error: 'You are not authorized to mark this appointment as completed'
        });
    }

    const appointment = await appointmentRepository.markAsCompleted(id);
    res.json({
        success: true,
        data: appointment
    });
};

module.exports = {
    createAppointment,
    getAppointmentsByUserId,
    deleteAppointment,
    getAppointmentsBySalonId,
    getAppointmentsByAdmin,
    updateAppointmentDate,
    markAsCompleted
};
