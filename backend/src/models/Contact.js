import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    company: {
      type: String,
      default: ""
    },

    service: {
      type: String,
      default: ""
    },

    message: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "new"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Contact", contactSchema);