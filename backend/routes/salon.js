const { Router } = require("express");
const { getSalonById, createSalon, updateSalon, deleteSalon } = require("../controllers/salones");
const router = Router();

router.get("/:id", getSalonById);
router.post("/", createSalon);
router.put("/:id", updateSalon);
router.delete("/:id", deleteSalon);

module.exports = router;
