const { Router } = require("express");
const { getSalonById, createSalon, updateSalon, deleteSalon, getSalones } = require("../controllers/salones");
const router = Router();

router.get("/:id", getSalonById);
router.post("/", createSalon);
router.get("/", getSalones);
router.put("/:id", updateSalon);
router.delete("/:id", deleteSalon);

module.exports = router;
