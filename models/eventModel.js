const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Events = mongoose.model("events" , eventSchema);
module.exports = Events;
