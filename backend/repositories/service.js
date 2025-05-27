const Service = require("../models/Service");

class ServiceRepository {
    static async getServicesBySalonId(salonId) {
        return await Service.find({ salonId });
    }

    static async getServiceById(id) {
        return await Service.findById(id);
    }

    static async createService(name, price, salonId) {
        const serviceNew = new Service({ name, price, salonId });
        return await serviceNew.save();
    }
}

module.exports = ServiceRepository;
