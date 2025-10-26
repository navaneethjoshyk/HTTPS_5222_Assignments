import { Router } from "express";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";

const r = Router();

/* ======================
   Admin Dashboard
   ====================== */
r.get("/", async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const skillCount = await Skill.countDocuments();
    const dbName = mongoose.connection?.name || "Not connected";

    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      projectCount,
      skillCount,
      dbName,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).send("Error loading dashboard");
  }
});

/* ======================
   Projects (list + create + delete)
   ====================== */
r.get("/projects", async (req, res) => {
  const projects = await Project.find().sort("-createdAt");
  res.render("admin/projects", {
    title: "Projects",
    projects,
    errors: [],
    values: {},
  });
});

r.post(
  "/projects",
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  async (req, res) => {
    const errors = validationResult(req);
    const { title, description, tags = "", url, featured } = req.body;
    if (!errors.isEmpty()) {
      const projects = await Project.find().sort("-createdAt");
      return res.status(400).render("admin/projects", {
        title: "Projects",
        projects,
        errors: errors.array(),
        values: req.body,
      });
    }
    await Project.create({
      title,
      description,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      url,
      featured: !!featured,
    });
    res.redirect("/admin/projects");
  }
);

r.post("/projects/:id/delete", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/admin/projects");
});

/* ======================
   Skills (list + create + delete)
   ====================== */
r.get("/skills", async (req, res) => {
  const skills = await Skill.find().sort("-createdAt");
  res.render("admin/skills", {
    title: "Skills",
    skills,
    errors: [],
    values: {},
  });
});

r.post(
  "/skills",
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("level")
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Level must be beginner, intermediate, or advanced"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const skills = await Skill.find().sort("-createdAt");
      return res.status(400).render("admin/skills", {
        title: "Skills",
        skills,
        errors: errors.array(),
        values: req.body,
      });
    }
    await Skill.create(req.body);
    res.redirect("/admin/skills");
  }
);

r.post("/skills/:id/delete", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect("/admin/skills");
});

export default r;
