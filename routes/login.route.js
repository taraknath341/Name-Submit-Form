const cookieParser = require("cookie-parser");
const express = require("express");
const login = express.Router();

login.get("/", (req, res) => {
  res.status(200).sendFile(`${req.app.locals.projectDir}/views/login.html`);
})

login.post("/", cookieParser(), express.urlencoded(), (req, res) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    res.cookie("auth", req.body.password);
    res.status(200).redirect("dashboard");
  } else {
    res.status(401).redirect("login");
  }
})

module.exports = login;