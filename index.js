const mongoose = require('mongoose');
const dotnev = require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
// const app = require("./app");

//middlewares
app.use(express.json());
app.use(cors());

//server
const port = process.env.PORT || 5000;
//DB CONNECTION
const DATABASE_URL = "mongodb+srv://tour:tourlist@cluster0.l2jwh.mongodb.net/admin";



// const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2jwh.mongodb.net/admin`;

mongoose
  .connect(DATABASE_URL, {
    dbName: 'job-portal-system',
  })
  .then(() => {
    console.log('Database connected successfully');
  });


//routes

app.get('/', (req, res) => {
  res.send('job-portal API Route is working');
});
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
// port
app.listen(port, () => {
  console.log('Express is running at port', port);
});
