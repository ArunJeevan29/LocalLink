const express = require("express");
const {
  createService,
  getServices,
  getMyServices,
  updateService,
  deleteService,
  getServiceById,
} = require("../controllers/serviceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getServices);
router.get("/me", protect, getMyServices);
router.post("/", protect, createService);

router.get("/:id", protect, getServiceById);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

module.exports = router;
