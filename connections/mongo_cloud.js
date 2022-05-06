const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_CLOUD_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();

const setItem = async (key = "hello", value = "world") => {
  try {
    const result = await client.db("Primary_db").collection("keys").insertOne({ key, value });
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getItem = async (key = "hello") => {
  try {
    const result = await client.db("Primary_db").collection("keys").findOne({ key });
    return result.value;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  setItem,
  getItem,
};
