const express = require("express");
const UserInfoSchema = require("../schema/userInfo.schema");

const home = express.Router();
home.use(express.urlencoded());

home.get("/", (req, res) => {
  res.status(200).sendFile(`${req.app.locals.projectDir}/views/index.html`);
});

home.post("/", async (req, res) => {
  await req.app.locals.dbCollection.insertOne(new UserInfoSchema(req.body));
  res.status(200).sendFile(`${req.app.locals.projectDir}/views/success.html`);
});

module.exports = home;