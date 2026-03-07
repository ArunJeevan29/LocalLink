const express = require("express");
const {
  createJob,
  getClientJobs,
  getProviderJobs,
  updateJobStatus,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createJob);

router.get("/client", protect, getClientJobs);
router.get("/provider", protect, getProviderJobs);

router.put("/:id/status", protect, updateJobStatus);

module.exports = router;
