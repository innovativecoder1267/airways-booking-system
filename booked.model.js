import mongoose, { Schema } from "mongoose";

// Define the Booking Schema
const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Use PascalCase as per mongoose model naming
    required: true
  },
  flight: {
    type: Schema.Types.ObjectId,
    ref: "Flight", // Should match the actual model name of flight
    required:false
  },
  passengerDetails: [
    {
      name: {
        type: String,
        required: false
      },
      age: {
        type: Number,
        required: false
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: false
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: false
  },
  bookingStatus: {
    type: String,
    enum: ["confirmed", "cancelled", "pending"],
    default: "confirmed",
    required: false
  },
    payment: {
    type:Object,
    required:true
    //everything is marked here as false just for testing purpose
    //it should be true in production
    //
  }
  //payment object is neccessary in this object is also neccessary mongo db create specific id for the specific object 
  //now cast error should not come options object is coming and now the error might not come here 
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Export the model
export const Booking = mongoose.model("Booking", bookingSchema);