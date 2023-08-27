import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  skill: { type: String, required: true },
  experience: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const usermodel = mongoose.model("user", userSchema);
export default usermodel;
