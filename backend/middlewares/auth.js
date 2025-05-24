const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { UserRepository } = require('../repositories/user');
const mongoose = require('mongoose');

const validateJWT = async (req = request, res = response, next) => {
    // Obtener el header Authorization
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: 'No authorization header provided'
        });
    }

    // Verificar que tenga el formato "Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Invalid authorization format. Expected: Bearer <token>'
        });
    }

    // Extraer solo el token (remover "Bearer " del inicio)
    const token = authHeader.substring(7); // "Bearer ".length = 7

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'No token provided'
        });
    }

    try {
        console.log('Token recibido:', token);

        // Verificar el token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Token decodificado:', decoded);

        // Extraer el uid del payload
        const { uid } = decoded;
        console.log('UID extraído:', uid);

        if (!uid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token payload - missing uid'
            });
        }

        // Convert string ID to ObjectId for MongoDB query
        const userId = new mongoose.Types.ObjectId(uid);
        const user = await UserRepository.getOne({ _id: userId });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token - user not found'
            });
        }

        // Agregar usuario al request
        req.user = user;
        next();

    } catch (error) {
        console.log('Error validando JWT:', error);

        // Manejar diferentes tipos de errores JWT
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token format'
            });
        } else {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }
    }
};

module.exports = {
    validateJWT
};
