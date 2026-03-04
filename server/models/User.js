const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Web Development"
  rate: { type: Number, required: true }   // e.g., 800
});

const reviewSchema = new mongoose.Schema({
  reviewerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  reviewerName: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String 
  }
});

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: {
    type: String,
    required: false
  },
  role: { 
    type: String, 
    enum: ['client', 'provider', 'admin'], 
    default: 'client' 
  },
  
  myServices: [serviceSchema], 
  reviews: [reviewSchema]      

}, { timestamps: true }); 
module.exports = mongoose.model('User', userSchema);