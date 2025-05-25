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

        this.paths = {
            auth: "/api/auth",
            salon: "/api/salon",
            service: "/api/service",
            package: "/api/package",
            appointment: "/api/appointment"
        }

        this.middlewares();
        this.routes();
        connectDB();
    }

    routes(){
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.salon, require("../routes/salon"));
        this.app.use(this.paths.service, require("../routes/service"));
        this.app.use(this.paths.package, require("../routes/package"));
        this.app.use(this.paths.appointment, require("../routes/appointment"));
        this.app.get("/", (req, res) => {
            res.send("API is running...");
        });
    }

    middlewares(){
        this.app.use(cors(this.corsOptions));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor escuchando en el puerto ${this.port}`)
        });
    }
}

module.exports = Server;
