const { Router } = require("express");
const { getSalonById, createSalon, updateSalon, deleteSalon, getSalones, getAdminSalones, getImage } = require("../controllers/salones");
const { validateJWT } = require("../middlewares/auth");
const router = Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
});


// Public routes
router.get("/", getSalones);

// Admin routes
router.get("/admin", validateJWT, getAdminSalones);

// Protected routes with parameters
router.get("/:id", getSalonById);
router.post("/", validateJWT, upload.single('image'), createSalon);
router.put("/:id", validateJWT, updateSalon);
router.delete("/:id", validateJWT, deleteSalon);


module.exports = router;
