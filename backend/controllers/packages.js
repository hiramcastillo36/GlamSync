const { response, request } = require("express");
const { packageRepository } = require("../repositories/package");

const getPackagesBySalonId = async (req = request, res = response) => {
    try {
        const { salonId } = req.params;
        const packages = await packageRepository.getPackagesBySalonId(salonId);

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

module.exports = {
    getPackagesBySalonId
};
