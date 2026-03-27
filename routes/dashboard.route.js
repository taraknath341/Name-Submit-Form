const express = require("express");
const UserInfoSchema = require("../schema/userInfo.schema");
const cookieParser = require("cookie-parser");
const dashboard = express.Router();

dashboard.use(cookieParser(), (req, res, next) => {
  if (req.cookies.auth !== process.env.ADMIN_PASSWORD) {
    res.status(401).redirect("login");
    return;
  }
  next();
});

dashboard.get("/", (req, res) => {
  res.status(200).sendFile(`${req.app.locals.projectDir}/views/dashboard.html`);
})

dashboard.post("/", async (req, res) => {
  let data = await req.app.locals.dbCollection.find()
    .sort({ firstName: 1 })
    .toArray();
  data = data.map(d => {
    delete d._id;
    return d;
  })
  res.status(200).json(data);
})

dashboard.post("/delete", express.json(), async (req, res) => {
  console.log(req.body);
  await req.app.locals.dbCollection.deleteOne(new UserInfoSchema(req.body));
  res.sendStatus(200);
})

module.exports = dashboard;