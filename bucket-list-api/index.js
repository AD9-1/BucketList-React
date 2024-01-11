require("dotenv").config();
const express = require("express");
const fs = require("fs");
const port = 7071;
const app = express();
const { v4: uuivd4 } = require("uuid");

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/bucketlist", (req, res) => {
  // handler for bucketlist route for all the bucketlist items
  const bucketlist = fs.readFileSync("./data/bucketlist.json", "utf8");
  res.json(JSON.parse(bucketlist));
});
//optional if we want to get a single bucketlist item
app.get("/bucketlist/:id", (req, res) => {
  const bucketlist = fs.readFileSync("./data/bucketlist.json", "utf8");
  const bucketlistsArray = JSON.parse(bucketlist);
  const foundBucketlist = bucketlistsArray.find(
    (bucketlist) => bucketlist.id === req.params.id
  );
  if (!foundBucketlist) {
    res.json({ message: "your id is not found in the data base" });
  }
  res.json(foundBucketlist);
});

app.post("/bucketlist", (req, res) => {
  let bucketlist = fs.readFileSync("./data/bucketlist.json", "utf8");
  bucketlist = JSON.parse(bucketlist);
  const newBucketlist = {
    id: uuivd4(),
    todo: req.body.todo,
    todowhy: req.body.todowhy,
    doneBy: req.body.doneBy,
  };
  console.log(req.body);
  console.log(newBucketlist);
  bucketlist.push(newBucketlist);
  fs.writeFileSync("./data/bucketlist.json", JSON.stringify(bucketlist));
  res.json(bucketlist);
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
