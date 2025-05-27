const { Router } = require("express");
const { getPackagesBySalonId, createPackage } = require("../controllers/packages");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.get("/salon/:salonId", getPackagesBySalonId);
router.post("/", validateJWT, createPackage);

module.exports = router;
