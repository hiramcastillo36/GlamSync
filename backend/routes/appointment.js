const { Router } = require("express");
const { createAppointment, getAppointmentsByUserId, deleteAppointment, getAppointmentsBySalonId, getAppointmentsByAdmin } = require("../controllers/appointment");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.get("/", validateJWT, getAppointmentsByUserId);
router.post("/", validateJWT, createAppointment);
router.delete("/:id", validateJWT, deleteAppointment);
router.get("/salon/:id", validateJWT, getAppointmentsBySalonId);
router.get("/admin", validateJWT, getAppointmentsByAdmin);

module.exports = router;
