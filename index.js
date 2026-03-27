const express = require("express");
const { MongoClient } = require("mongodb");
const homeRoute = require("./routes/home.route");
const dashboardRoute = require("./routes/dashboard.route");
const loginRoute = require("./routes/login.route");
const logoutRoute = require("./routes/logout.route");
const app = express();

app.locals.projectDir = __dirname;

app.use("/", homeRoute);
app.use("/dashboard", dashboardRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);

app.use((err, req, res, next) => {
  res.status(400).end(err.message);
})

app.listen(3000, async err => {
  if (err) {
    console.log("-error-->", err.message);
    return;
  }
  console.log("Server is listen on port 3000");
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  console.log("Mongodb connect success");
  app.locals.dbCollection = client.db("mydb").collection("Name-Submit-Form");
})