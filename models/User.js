import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Optional for your app (useful later)
    image: {
      type: String,
      default: "",
    },

    handle: {
      type: String,
      unique: true,
      sparse: true, // allows null values
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);