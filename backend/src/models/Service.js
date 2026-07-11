import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    shortDescription: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      required: true
    },

    subServices: [
      {
        title: {
          type: String,
          required: true
        },

        description: {
          type: String,
          default: ""
        },

        features: {
          type: [String],
          default: []
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Service", serviceSchema);