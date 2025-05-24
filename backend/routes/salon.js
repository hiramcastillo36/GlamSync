const { Router } = require("express");
const { getSalonById, createSalon, updateSalon, deleteSalon, getSalones } = require("../controllers/salones");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.get("/:id", getSalonById);
router.get("/", getSalones);

router.post("/", validateJWT, createSalon);
router.put("/:id", validateJWT, updateSalon);
router.delete("/:id", validateJWT, deleteSalon);

module.exports = router;
