import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true
  },
  flightNumber: {
    type: String, // changed to String: flight numbers are often alphanumeric like "AI202"
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seatsAvailable: {
    type: Number,
    required: true
  },
  class: {
    type: String,
    enum: ["Economy", "Business", "First"], // makes it structured
    required: true
  }
}, { timestamps: true });

export const Flight = mongoose.model("Flight", flightSchema);

// from: String,
  //to: String,
  //departureTime: Date,
  //arrivalTime: Date,
  //duration: String,
  //price: Number,
  //seatsAvailable: Number,
  //class: String // Economy, Business