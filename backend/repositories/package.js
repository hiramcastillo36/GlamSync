const Package = require('../models/Package');
const ObjectId = require('mongoose').Types.ObjectId;

class PackageRepository {
    async getPackagesBySalonId(salonId) {
        return await Package.find({ salonId });
    }
}

const packageRepository = new PackageRepository();

module.exports = {
    packageRepository
};
