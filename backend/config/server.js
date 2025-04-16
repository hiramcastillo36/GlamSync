const express = require("express");
const cors = require("cors");
const connectDB = require("./database")

class Server {

    constructor(){
        this.port = process.env.PORT || 8080;
        this.app = express();
        this.corsOptions = {
            origin: [
                process.env.FRONTEND_URL
            ]
        };

        connectDB();
    }

    routes(){
        this.app.get("*", function(req, res) {
            res.status(404).json({
                msg: "Ruta no encontrada",
                result: 12345
            })
        });
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor escuchando en el puerto ${this.port}`)
        });
    }
}

module.exports = Server;
