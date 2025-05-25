const { Router } = require("express");
const { getServicesBySalonId } = require("../controllers/services");
const router = Router();

router.get("/salon/:salonId", getServicesBySalonId);

module.exports = router;
