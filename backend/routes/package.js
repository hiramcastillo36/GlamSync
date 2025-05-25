const { Router } = require("express");
const { getPackagesBySalonId } = require("../controllers/packages");
const router = Router();

router.get("/salon/:salonId", getPackagesBySalonId);

module.exports = router;
