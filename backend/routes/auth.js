const { Router } = require("express");
const { login, register, getCurrentUser } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", validateJWT, getCurrentUser);

module.exports = router;
