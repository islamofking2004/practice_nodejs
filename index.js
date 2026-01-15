require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/getInfo", getInfo)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


function getInfo(req, res) {
    res.send("hello world")
}