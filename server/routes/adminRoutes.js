const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);

router.get("/listings", adminController.getAllListings);
router.patch("/listings/:id/status", adminController.updateListingStatus);
router.delete("/listings/:id", adminController.deleteListing);

module.exports = router;
