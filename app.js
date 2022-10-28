const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());


//All routes
const jobRoute = require("./routes/jobRoute");
const candidateRoute = require("./routes/candidateRoute");
const managerRoute = require("./routes/managerRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
// API 
app.use("/jobs", jobRoute);
app.use("/candidates", candidateRoute);
app.use("/manager", managerRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

// main route 
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;




