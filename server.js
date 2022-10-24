const mongoose = require('mongoose');
const dotnev = require('dotenv').config();

const app = require("./app");

//server
const port = process.env.PORT || 5000;
//DB CONNECTION
const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2jwh.mongodb.net/admin`;

mongoose
  .connect(DATABASE_URL, {
    dbName: 'job-portal-system',
  })
  .then(() => {
    console.log('Database connected successfully');
  });


//routes

app.get('/', (req, res) => {
  res.send('API Route is working');
});

// port
app.listen(port, () => {
  console.log('Express is running at port', port);
});
