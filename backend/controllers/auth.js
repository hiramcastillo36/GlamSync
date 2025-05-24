const { response, request } = require("express");
const { UserRepository } = require("../repositories/user");
const { Validations } = require("../helpers/validations");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt");

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: "Invalid data"
        });
    }

    const user = await UserRepository.getOne({ email: email });
    if (!user) {
        return res.status(401).json({
            success: false,
            error: "Invalid email or password"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({
            success: false,
            error: "Invalid email or password"
        });
    }

    try {
        const { password: _, ...simpleUser } = user.toObject();
        const token = await generateJWT(user._id.toString());
        res.status(200).json({
            success: true,
            data: {
                token,
                user: simpleUser
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

const register = async (req = request, res = response) => {
    const { email, password } = req.body;
    const saltRounds = process.env.SALT_ROUNDS || 10;

    try {
        Validations.email(email);
        Validations.password(password);
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

    try {
        const user = await UserRepository.getOne({ email: email });
        if (user) {
            return res.status(400).json({
                success: false,
                error: "Email already in use"
            });
        }

        const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
        const newUser = await UserRepository.create({
            email: email,
            password: hashedPassword,
            role: "client"
        });

        const { password: _, ...simpleUser } = newUser.toObject();

        res.status(201).json({
            success: true,
            data: simpleUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

const getCurrentUser = async (req = request, res = response) => {
    try {
        const { password, ...userWithoutPassword } = req.user.toObject();

        res.json({
            success: true,
            data: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error getting user data"
        });
    }
};

module.exports = {
    login,
    register,
    getCurrentUser
};
