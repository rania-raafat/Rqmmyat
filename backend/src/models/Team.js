import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: String,

    position: String,

    quote: String,

    image: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Team", teamSchema, "team");