const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
//const users = require("./MOCK_DATA.json");
const userRouter = require('./routes/user');
const{logReqRes}=require('./middleware')
const{connectMonogDb} =require('./connection')
//require('dotenv').config(); // for env file
const app = express();
const port = 8010;

// Connection
connectMonogDb("mongodb://127.0.0.1:27017/youtube-app-1");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Mongo Error", error);
  });
//Middleware
//It is type of Plug in/ middleware
// Post man m jo x-www-form-urlencoded waha s data laega
// use of middle ware
app.use(express.urlencoded({extende:false}));
app.use(logReqRes("log.txt"));
//Routes
app.use("/api/users",userRouter);
app.listen(port, () => {
  console.log(`Server Started at port:${port}`);
});
