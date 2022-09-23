const express = require("express");
const { UserController } = require("../Controllers/user.controller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

const controller = new UserController();

const UserRouter = express.Router();

UserRouter.get("/User", verifyToken, (req, res) => {
  controller.list(req, res);
});
UserRouter.get("/User/:id[0-9]*", verifyToken, (req, res) => {
  controller.get(req, res);
});
UserRouter.post("/User", (req, res) => {
  controller.create(req, res);
});
UserRouter.put("/User", verifyToken, (req, res) => {
  controller.update(req, res);
});
UserRouter.delete("/User", verifyToken, (req, res) => {
  controller.delete(req, res);
});
UserRouter.put("/updatepass", verifyToken, (req, res) => {
  controller.updatePassword(req, res);
});
module.exports = { UserRouter };
