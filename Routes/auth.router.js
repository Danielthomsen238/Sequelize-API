const express = require("express");
const { AuthController } = require("../Controllers/auth.controller.js");

const controller = new AuthController();

const AuthRouter = express.Router();

AuthRouter.post("/Login", (req, res) => {
  controller.login(req, res);
});
AuthRouter.post("/oneTimeLogin", (req, res) => {
  controller.oneTimeLogin(req, res);
});
AuthRouter.put("/Reset", (req, res) => {
  controller.resetPassword(req, res);
});

module.exports = { AuthRouter };
