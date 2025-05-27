const { Router } = require("express");
const { createAppointment, getAppointmentsByUserId,
    deleteAppointment, getAppointmentsBySalonId,
    getAppointmentsByAdmin, updateAppointmentDate,
    markAsCompleted } = require("../controllers/appointment");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.get("/", validateJWT, getAppointmentsByUserId);
router.post("/", validateJWT, createAppointment);
router.delete("/:id", validateJWT, deleteAppointment);
router.get("/salon/:id", validateJWT, getAppointmentsBySalonId);
router.get("/admin", validateJWT, getAppointmentsByAdmin);
router.put("/:id", validateJWT, updateAppointmentDate);
router.put("/:id/completed", validateJWT, markAsCompleted);

module.exports = router;
