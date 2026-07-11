import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: String,

    industry: String,

    logo: String,

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Client", clientSchema);