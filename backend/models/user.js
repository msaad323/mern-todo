import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: {type: String, required: [true, "password is required."]},
});

export default mongoose.model("User", userSchema);
