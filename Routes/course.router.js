const express = require("express");
const { CourseController } = require("../Controllers/course.controller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

const controller = new CourseController();

const CourseRouter = express.Router();

CourseRouter.get("/course", (req, res) => {
  controller.list(req, res);
});
CourseRouter.get("/courseSingle", (req, res) => {
  controller.get(req, res);
});
CourseRouter.post("/course", verifyToken, (req, res) => {
  controller.create(req, res);
});
CourseRouter.put("/course", verifyToken, (req, res) => {
  controller.update(req, res);
});
CourseRouter.delete("/course", verifyToken, (req, res) => {
  controller.delete(req, res);
});

module.exports = { CourseRouter };
