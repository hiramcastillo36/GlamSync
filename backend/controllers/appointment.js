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
                userId: req.user.id,
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
                userId: req.user.id,
                salonId,
                serviceId,
                appointmentDate,
                appointmentTime,
                totalPrice
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

module.exports = {
    createAppointment
};
