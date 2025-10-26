import { Router } from "express";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";

const r = Router();

r.get("/projects", async (req, res) => {
  const { limit = 50, sort = "-createdAt", tag, featured } = req.query;
  const q = {};
  if (tag) q.tags = tag;
  if (featured !== undefined) q.featured = featured === "true";
  const data = await Project.find(q).sort(sort).limit(Number(limit));
  res.json({ success: true, data });
});

r.get("/skills", async (req, res) => {
  const { limit = 50, sort = "name", level } = req.query;
  const q = {};
  if (level) q.level = level;
  const data = await Skill.find(q).sort(sort).limit(Number(limit));
  res.json({ success: true, data });
});

export default r;
