const { response, request } = require("express");
const { appointmentRepository } = require("../repositories/appointment");

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

module.exports = {
    createAppointment,
    getAppointmentsByUserId,
    deleteAppointment,
    getAppointmentsBySalonId,
    getAppointmentsByAdmin
};
