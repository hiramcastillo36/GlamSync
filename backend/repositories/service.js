const Service = require("../models/Service");

class ServiceRepository {
    static async getServicesBySalonId(salonId) {
        return await Service.find({ salonId });
    }

    static async getServiceById(id) {
        return await Service.findById(id);
    }
}

module.exports = ServiceRepository;
