const { response, request } = require("express");
const ServiceRepository = require("../repositories/service");

const getServicesBySalonId = async (req = request, res = response) => {
    const { salonId } = req.params;
    const services = await ServiceRepository.getServicesBySalonId(salonId);
    res.json({
        success: true,
        data: services
    });
};

const createService = async (req = request, res = response) => {
    const { name, price, salonId } = req.body;
    const service = await ServiceRepository.createService(name, price, salonId);
    res.json({
        success: true,
        data: service
    });
};

module.exports = {
    getServicesBySalonId,
    createService
};
