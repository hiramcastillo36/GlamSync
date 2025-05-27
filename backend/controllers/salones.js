const { response, request } = require("express");
const { salonRepository } = require("../repositories/salon");
const Service = require("../models/Service");
const Package = require("../models/Package");
const { appointmentRepository } = require("../repositories/appointment");
const mongoose = require('mongoose');

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
        const { name, address, phone, description, workingHours, services, packages, image } = req.body;

        const administratorId = req.user._id;

        let serviceIds = [];
        if (services && services.length > 0) {
            for (const serviceData of services) {
                const newService = new Service({
                    salonId: null,
                    name: serviceData.name,
                    price: serviceData.price,
                    creationDate: new Date(),
                    isActive: true
                });
                const savedService = await newService.save();
                serviceIds.push(savedService._id);
            }
        }

        let packageIds = [];
        if (packages && packages.length > 0) {
            for (const packageData of packages) {
                const newPackage = new Package({
                    salonId: null,
                    name: packageData.name,
                    description: packageData.description,
                    price: packageData.price,
                    services: serviceIds
                });
                const savedPackage = await newPackage.save();
                packageIds.push(savedPackage._id);
            }
        }

        const salonData = {
            administratorId,
            name,
            address,
            phone,
            description,
            workingHours,
            image,
            services: serviceIds,
            packages: packageIds,
            registerDate: new Date(),
            isActive: true,
            rating: 0,
            ratingCount: 0
        };

        console.log(salonData);

        const salon = await salonRepository.create(salonData);

        await Service.updateMany({ _id: { $in: serviceIds } }, { salonId: salon._id });
        await Package.updateMany({ _id: { $in: packageIds } }, { salonId: salon._id });

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

        console.log(id);

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

        const deletedSalon = await salonRepository.delete(id);

        console.log(deletedSalon);

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
        const salons = await salonRepository.getAll(
            {
                isActive: true
            }
        );

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

const getAdminSalones = async (req = request, res = response) => {
    try {
        const salons = await salonRepository.getAll({ administratorId: req.user._id });

        for (const salon of salons) {

            const services = await Service.find({ salonId: salon._id });
            const packages = await Package.find({ salonId: salon._id }).populate({
                path: "services",
                select: "name price"
            });
            salon.services = services;
            salon.packages = packages;
        }

        console.log(salons);
        res.json({
            success: true,
            data: salons
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error getting admin salons'
        });
    }
};

const getImage = async (req = request, res = response) => {
    try {
      const { salonId, imageIndex = 0 } = req.params;
      const salon = await salonRepository.getById(salonId);

      if (!salon || !salon.images || !salon.images[imageIndex]) {
        return res.status(404).json({
          success: false,
          message: 'Imagen no encontrada'
        });
      }

      const image = salon.images[imageIndex];

      res.set({
        'Content-Type': image.contentType,
        'Content-Length': image.image.length
      });

      res.send(image.image);
    } catch (error) {
      console.error('Error getting image:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

const updateActiveSalon = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const salon = await salonRepository.getById(id);

        if (!salon) {
            return res.status(404).json({
                error: 'Salon not found'
            });
        }

        const updatedSalon = await salonRepository.update(id, { isActive });

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
}

const updateRating = async (req = request, res = response) => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        const { id } = req.params;
        const { rating } = req.body;

        const newRating = parseInt(rating);

        console.log(newRating);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid appointment ID format'
            });
        }


        const appointment = await appointmentRepository.getById(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                error: 'Appointment not found'
            });
        }

        if (appointment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: 'You can only rate your own appointments'
            });
        }


        const salon = await salonRepository.getById(appointment.salonId.toString());

        if (!salon) {
            return res.status(404).json({
                success: false,
                error: 'Salon not found'
            });
        }

        const currentRating = salon.rating || 0;
        const currentCount = salon.ratingCount || 0;

        let newRatingAverage;
        if (currentCount === 0) {
            newRatingAverage = newRating;
        } else {
            const totalPoints = (currentRating * currentCount) + newRating;
            newRatingAverage = totalPoints / (currentCount + 1);
        }

        newRatingAverage = parseFloat(newRatingAverage.toFixed(2));
        const newCount = currentCount + 1;

        const updatedSalon = await salonRepository.updateRating(salon._id, newRatingAverage, newCount, { session });
        await appointmentRepository.update(id, { rated: true, rating: newRatingAverage }, { session });

        await session.commitTransaction();

        res.json({
            success: true,
            message: 'Rating submitted successfully',
            data: {
                salon: updatedSalon,
                newRating: newRatingAverage,
                totalRatings: newCount,
                submittedRating: newRatingAverage,
                previousRating: currentRating
            }
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error updating salon rating:', error);
        res.status(500).json({
            success: false,
            error: 'Error updating salon rating'
        });
    } finally {
        session.endSession();
    }
};

module.exports = {
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getSalones,
    getAllSalons,
    getAdminSalones,
    getImage,
    updateActiveSalon,
    updateRating
};
