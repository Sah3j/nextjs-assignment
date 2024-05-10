import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
  },
  img: {
    type: String,
  },
}, {timestamps: true})

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  attendees: {
    type: [String],
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
}, {timestamps: true})

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Event = mongoose.models?.Event || mongoose.model("Event", eventSchema);