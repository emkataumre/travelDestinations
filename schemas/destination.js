import mongoose from "mongoose";
import { countries } from "../public/countries.js";

const { Schema } = mongoose;

const Destination = new Schema({
  country: {
    type: String,
    required: true,
    enum: countries,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  arrivalDate: {
    type: Date,
  },
  departureDate: {
    type: Date,
  },

  image: { type: String },
  description: { type: String },
});

export default mongoose.model("Destination", Destination);
