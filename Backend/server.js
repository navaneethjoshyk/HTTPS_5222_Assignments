import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { fileURLToPath } from "url";

import Project from "./src/models/Project.js";
import Skill from "./src/models/Skill.js";
import apiRouter from "./src/routes/api.js";
import adminRouter from "./src/routes/admin.js";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));

await mongoose.connect(process.env.MONGO_URI, { dbName: "http5222_a1" });
console.log("✅ MongoDB connected");

// Routes
app.use("/api", apiRouter);       // JSON endpoints
app.use("/admin", adminRouter);   // server-rendered admin

// 404s
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ success: false, error: "Not found" });
  }
  res.status(404).render("admin/dashboard", { title: "Not Found", error: "Page not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
