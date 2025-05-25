const { Router } = require("express");
const { createAppointment } = require("../controllers/appointment");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.post("/", validateJWT, createAppointment);

module.exports = router;
