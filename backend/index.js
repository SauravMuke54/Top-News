const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes= require('./routes/auth')
const newsRoutes= require('./routes/news')
require("dotenv").config();
const port = 4000;
const mongoose = require("mongoose");
const DB = process.env.DATABASE;

//database connection
mongoose.connect(DB).then(() => {
  console.log("DB connected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api',authRoutes)
app.use('/api',newsRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



