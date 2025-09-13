import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required:true,
    minlength: 3,
    maxlength: 20,
    unique: true
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
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking"
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

userSchema.methods.generateaccesstoken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
       iat: Math.floor(Date.now() / 1000), // issued at time
      rnd: Math.random().toString(36).substring(2, 15) 
    },
    process.env.GENERATE_ACCESSTOKEN,
    { expiresIn: "24h" }
  );
};

userSchema.methods.generaterefreshtoken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.GENERATE_REFRESHTOKEN,
    { expiresIn: "2h" }
  );
};

export const User = mongoose.model("User", userSchema);