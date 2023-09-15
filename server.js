//Database setup
import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { MongoClient, ServerApiVersion } from "mongodb";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const server = express();
server.use(require("body-parser").json());
server.use(express.static("public"));

let uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Connect the server to the database

async function insertIntoDB(destinationData) {
  try {
    await client.connect();

    const collection = client.db("travelDestinations").collection("destinations");

    //Establish a connection with the database and create some basic consts to reference docs and collections
    await collection.insertOne(destinationData);
    return {
      success: true,
      message: "Data inserted successfully"
    }
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return {
        success: false,
        message: "Data already exists."
      }
    } else {
      console.error(error);
      return {
        success: false,
        message: "Internal Server Error"
      }
    }
  } finally {
    await client.close();
  }
}

//Express server setup
server.get("/", (req, res) => {
  res.sendFile("pages/index.html", { root: __dirname });
});

server.get("/form", (req, res) => {
  res.sendFile("pages/form.html", { root: __dirname });
});

server.post("/api/addDestination", async (req, res) => {
  const response = await insertIntoDB(req.body);
  res.json(response);
});

server.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
