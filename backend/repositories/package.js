const Package = require('../models/Package');
const ObjectId = require('mongoose').Types.ObjectId;

class PackageRepository {
    async getPackagesBySalonId(salonId) {
        return await Package.find({ salonId }).populate({
            path: "services",
            select: "name price"
        });
    }

    async createPackage(name, description, price, salonId, services) {
        const packageNew = new Package({ name, description, price, salonId, services });
        return await packageNew.save();
    }
}

const packageRepository = new PackageRepository();

module.exports = {
    packageRepository
};
