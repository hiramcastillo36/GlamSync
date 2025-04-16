class Validations {

    static email(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(typeof email !== 'string') throw new Error("El email debe ser una cadena");
        if(!regex.test(email)) throw new Error("El email no es válido");
    }

    static password(password){
        if(typeof password !== 'string') throw new Error("La contraseña debe ser una cadena");
        if(password.length < 5) throw new Error("La contraseña debe tener mínimo 5 caracteres");
    }
}

module.exports = { Validations }
