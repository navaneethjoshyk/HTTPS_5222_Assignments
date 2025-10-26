import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  url: { type: String, trim: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Project", schema);
