const User = require('../models/User'); 
const Listing = require('../models/Service'); 

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

const updateListingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['active', 'pending', 'flagged'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    );

    if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Failed to update listing" });
  }
};

const deleteListing = async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Failed to delete listing" });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllListings,
  updateListingStatus,
  deleteListing
};