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

  bucketlist.push(newBucketlist);
  fs.writeFileSync("./data/bucketlist.json", JSON.stringify(bucketlist));
  res.json(bucketlist);
});

app.delete("/bucketlist/:id", (req, res) => {
  let bucketlist = fs.readFileSync("./data/bucketlist.json", "utf-8");
  bucketlist = JSON.parse(bucketlist);
  const updateBucketList = bucketlist.filter(
    (bucket) => bucket.id !== req.params.id
  );
  fs.writeFileSync("./data/bucketlist.json", JSON.stringify(updateBucketList));
  res.json(updateBucketList);
});

app.put("/bucketlist/:id", (req, res) => {
  let bucketlist = fs.readFileSync("./data/bucketlist.json", "utf-8");
  bucketlist = JSON.parse(bucketlist);

  let findBucket = bucketlist.find((bucket) => bucket.id === req.params.id);

  if (findBucket) {
    console.log("Existing Bucket:", findBucket);

    if (req.body) {
      const updatedBucketList = bucketlist.filter(
        (bucket) => bucket.id !== req.params.id
      );

      findBucket["todo"] = req.body.todo ? req.body.todo : findBucket["todo"];
      findBucket["todowhy"] = req.body.todowhy
        ? req.body.todowhy
        : findBucket["todowhy"];
      findBucket["doneBy"] = req.body.doneBy
        ? req.body.doneBy
        : findBucket["doneBy"];

      updatedBucketList.push(findBucket);

      fs.writeFileSync(
        "./data/bucketlist.json",
        JSON.stringify(updatedBucketList, null, 2)
      );
      return res.json(updatedBucketList);
    } else {
      return res.status(400).json({ error: "Request body is missing." });
    }
  } else {
    console.log("I am here");
    return res.status(404).json({ error: "Bucket not found." });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
