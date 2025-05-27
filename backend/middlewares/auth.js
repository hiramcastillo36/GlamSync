const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { UserRepository } = require('../repositories/user');

const validateJWT = async (req = request, res = response, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            error: 'No authorization header provided'
        });
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Invalid authorization format. Expected: Bearer <token>'
        });
    }

    const token = authHeader.substring(7);

    if (!token) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const { uid } = decoded;

        if (!uid) {
            return res.status(401).json({
                error: 'Invalid token payload - missing uid'
            });
        }

        const user = await UserRepository.getOne({ _id: uid });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid token - user not found'
            });
        }

        req.user = user;

        console.log(req.user);

        next();

    } catch (error) {
        console.log('Error validando JWT:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Invalid token format'
            });
        } else {
            return res.status(401).json({
                error: 'Invalid token'
            });
        }
    }
};

module.exports = {
    validateJWT
};
