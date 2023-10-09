import mongoose from "mongoose";
import { countries } from "../utils.js";

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
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => {
        return value < this.departureDate;
      },
      message: "Arrival date must be before departure date",
    },
  },
  departureDate: {
    type: Date,
    required: true,
  },
  image: String,
  description: String,
});

export default mongoose.model("Destination", Destination);
