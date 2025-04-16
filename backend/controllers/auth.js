const { response, request } = require("express");
const { UserRepository } = require("../repositories/user");
const { Validations } = require("../helpers/validations");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt");

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            msg: "Datos inválidos"
        })
    }

    const user = await UserRepository.getOne({ email: email });
    if(!user){
        return res.status(401).json({
            msg: "Correo y/o contraseña inválidos"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(401).json({
            msg: "Correo y/o contraseña inválidos"
        });
    }

    try{
        const { password: _, ...simpleUser } = user.toObject();
        const token = await generateJWT(email);
        res.status(200).json({
            msg: "Login OK",
            token: token,
            user: simpleUser
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Internal error"
        })
    }
}

const register = async (req = request, res= response)=>{
    const { email, password } = req.body;
    const saltRounds = process.env.SALT_ROUNDS || 10;

    try{
        Validations.email(email);
        Validations.password(password);
    }
    catch(error){
        return res.status(400).json({
            msg: error.message
        })
    }

    try{
        const user = await UserRepository.getOne({ email: email});
        if(user){
            return res.status(400).json({
                msg: "El email ya está en uso."
            });
        }

        const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
        const newUser = await UserRepository.create({
            email: email,
            password: hashedPassword,
            role: "client"
        })

        const { password: _, ...simpleUser } = newUser.toObject();

        res.status(200).json({
            msg: "Usuario creado",
            user: simpleUser
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Internal error"
        })
    }
}

module.exports = {
    login,
    register
}
