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

module.exports = {
    getServicesBySalonId,
};
