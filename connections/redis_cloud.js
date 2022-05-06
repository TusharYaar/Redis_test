const redis = require("redis");

require("dotenv").config();

const client = redis.createClient({
  url: process.env.REDIS_CLOUD_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

const setItem = async (key = "hello", value = "world") => {
  try {
    await client.set(key, value);
  } catch (err) {
    console.log(err);
  }
};

const getItem = async (key = "hello") => {
  try {
    const result = await client.get(key);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  setItem,
  getItem,
};
