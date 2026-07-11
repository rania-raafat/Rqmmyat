import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    shortDescription: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "Completed"
    },

    image: {
      type: String,
      required: true
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Project", projectSchema);