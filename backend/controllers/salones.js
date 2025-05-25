const { response, request } = require("express");
const { salonRepository } = require("../repositories/salon");
const Service = require("../models/Service");
const Package = require("../models/Package");
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB límite
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
});

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
        const { name, address, phone, description, workingHours, services, packages } = req.body;

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
                    price: packageData.price
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
            image: req.file,
            services: serviceIds,
            packages: packageIds,
            registerDate: new Date(),
            isActive: true
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

const getAdminSalones = async (req = request, res = response) => {
    try {
        const salons = await salonRepository.getAll({ administratorId: req.user._id });
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

module.exports = {
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getSalones,
    getAllSalons,
    getAdminSalones,
    getImage
};
