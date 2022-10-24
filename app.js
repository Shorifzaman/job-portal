const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());


//All routes
const jobsRoute = require('./routes/jobs.route')
const hiringManagerRoute = require('./routes/hiringManager.route')
const userRoute = require("./routes/user.route")
const candidateRoute = require("./routes/candidate.route")
const adminRoute = require("./routes/admin.route")

// All API 
app.use("/job", jobsRoute)
app.use("/hrmanager", hiringManagerRoute)
app.use("/candidate", candidateRoute)
app.use("/admin", adminRoute)
app.use("/user", userRoute)

// main route 
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;




