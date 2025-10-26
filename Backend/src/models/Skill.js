import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  years: { type: Number, min: 0, default: 0 }
}, { timestamps: true });
export default mongoose.model("Skill", schema);
