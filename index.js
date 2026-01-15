require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 5000;

let dummy_users = [
  {
    name: "islam",
    age: 67,
    degree: "student",
    isMarried: false,
  },
];

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/api/users/", getAllUsers);
app.post("/api/users/add", addUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function getInfo(req, res) {
  res.send("hello world");
}
