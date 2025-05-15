const { response, request } = require("express");
const { salonRepository } = require("../repositories/salon");

const getSalonById = async (req = request, res = response) => {
    const { id } = req.params;
    const salon = await salonRepository.getById(id);
    res.status(200).json(salon);
}

const createSalon = async (req = request, res = response) => {
    try {
        const salon = await salonRepository.create(req.body);
        res.status(201).json(salon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateSalon = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const salon = await salonRepository.update(id, req.body);
        if (!salon) {
            return res.status(404).json({ error: 'Salon not found' });
        }
        res.status(200).json(salon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteSalon = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const salon = await salonRepository.delete(id);
        if (!salon) {
            return res.status(404).json({ error: 'Salon not found' });
        }
        res.status(200).json(salon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getSalones = async (req = request, res = response) => {
    const salones = await salonRepository.getAll();
    res.status(200).json(salones);
}

module.exports = {
    getSalonById,
    createSalon,
    updateSalon,
    deleteSalon,
    getSalones
}
