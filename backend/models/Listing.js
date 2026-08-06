import mongoose from "mongoose";


// Schema for every listing
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  bedrooms: {
    type: Number,
    default: 0,
  },

  bathrooms: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

// Create the Listing model
const Listing = mongoose.model("Listing", listingSchema);

export default Listing;


