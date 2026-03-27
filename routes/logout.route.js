const express = require("express");
const logout = express.Router();

logout.get("/", (req, res) => {
  res.clearCookie("auth");
  res.redirect("login");
})

module.exports = logout;