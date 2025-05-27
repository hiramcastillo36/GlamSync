const { Router } = require("express");
const { getServicesBySalonId, createService } = require("../controllers/services");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.get("/salon/:salonId", getServicesBySalonId);
router.post("/", validateJWT, createService);

module.exports = router;
