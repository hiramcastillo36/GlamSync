const { response, request } = require("express");
const { salonRepository } = require("../repositories/salon");

const getSalonById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const salon = await salonRepository.getById(id);

        if (!salon) {
            return res.status(404).json({
                error: 'Salon not found'
            });
        }

        res.json({
            success: true,
            data: salon
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error getting salon'
        });
    }
};

const createSalon = async (req = request, res = response) => {
    try {
        const { name, address, phone, description, workingHours, images, services, packages } = req.body;

        const administratorId = req.user._id;

        const salonData = {
            administratorId,
            name,
            address,
            phone,
            description,
            workingHours,
            images,
            services,
            packages
        };

        const salon = await salonRepository.create(salonData);

        res.status(201).json({
            success: true,
            message: 'Salon created successfully',
            data: salon
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error creating salon'
        });
    }
};

const updateSalon = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, address, phone, description, workingHours, images, services, packages } = req.body;

        const salon = await salonRepository.getById(id);

        if (!salon) {
            return res.status(404).json({
                error: 'Salon not found'
            });
        }

        if (salon.administratorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'Not authorized to update this salon'
            });
        }

        const salonData = {
            name,
            address,
            phone,
            description,
            workingHours,
            images,
            services,
            packages
        };

        const updatedSalon = await salonRepository.update(id, salonData);

        res.json({
            success: true,
            message: 'Salon updated successfully',
            data: updatedSalon
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error updating salon'
        });
    }
};

const deleteSalon = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const salon = await salonRepository.getById(id);

        if (!salon) {
            return res.status(404).json({
                error: 'Salon not found'
            });
        }

        if (salon.administratorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'Not authorized to delete this salon'
            });
        }

        await salonRepository.delete(id);

        res.json({
            success: true,
            message: 'Salon deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error deleting salon'
        });
    }
};

const getSalones = async (req = request, res = response) => {
    try {
        const salons = await salonRepository.getAll();

        res.json({
            success: true,
            data: salons
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error getting salons'
        });
    }
};

const getAllSalons = async (req = request, res = response) => {
    try {
        const salons = await salonRepository.getAll();
        res.json({
            success: true,
            data: salons
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error getting salons'
        });
    }
};

module.exports = {
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getSalones,
    getAllSalons
};
