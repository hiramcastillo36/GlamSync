const { Router } = require("express");
const { createAppointment, getAppointmentsByUserId, deleteAppointment } = require("../controllers/appointment");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.get("/", validateJWT, getAppointmentsByUserId);
router.post("/", validateJWT, createAppointment);
router.delete("/:id", validateJWT, deleteAppointment);

module.exports = router;
