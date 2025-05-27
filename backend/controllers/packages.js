const { response, request } = require("express");
const { packageRepository } = require("../repositories/package");

const getPackagesBySalonId = async (req = request, res = response) => {
    try {
        const { salonId } = req.params;
        const packages = await packageRepository.getPackagesBySalonId(salonId, {
            populate: {
                path: "services",
                select: "name price"
            }
        });

        res.json({
            success: true,
            data: packages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message || 'Error getting packages'
        });
    }
};

const createPackage = async (req = request, res = response) => {
    const { name, description, price, salonId, services } = req.body;
    const package = await packageRepository.createPackage(name, description, price, salonId, services);
    res.json({
        success: true,
        data: package
    });
};

module.exports = {
    getPackagesBySalonId,
    createPackage
};
