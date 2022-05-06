const express = require("express");
var bodyParser = require("body-parser");
const { performance } = require("perf_hooks");
// importing connections
const redis_local = require("./connections/redis_local");
const redis_cloud = require("./connections/redis_cloud");
const mongo_cloud = require("./connections/mongo_cloud");

const PORT = process.env.PORT || 3000;

const app = express();

var jsonParser = bodyParser.json();

app.use(jsonParser);

app.post("/set/:db", async (req, res) => {
  const { key, value } = req.body;
  const { db } = req.params;

  if (!key || !value) {
    return res.status(400).send("Bad Request");
  }
  try {
    switch (db) {
      case "redis":
        await redis_local.setItem(key, value);
        break;
      case "redis_cloud":
        await redis_cloud.setItem(key, value);
        break;
      case "mongo":
        await mongo_cloud.setItem(key, value);
        break;
    }
    return res.status(201).send(`Set in ${db}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get/:db/:key", async (req, res) => {
  const { key, db } = req.params;
  if (!key) {
    return res.status(400).send("Bad Request");
  }
  try {
    let val = "";
    switch (db) {
      case "redis":
        val = await redis_local.getItem(key);
        break;
      case "redis_cloud":
        val = await redis_cloud.getItem(key);
        break;
      case "mongo":
        val = await mongo_cloud.getItem(key);
        break;
    }
    return res.status(201).send(`${val} from ${db}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
