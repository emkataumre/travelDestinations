import mongoose from "mongoose";

const { Schema } = mongoose;

const Destination = new Schema({
  country: String,
  title: String,
  link: String,
  arrivalDate: Date,
  departureDate: Date,
  image: String,
  description: String,
});

export default mongoose.model("Destination", Destination);
