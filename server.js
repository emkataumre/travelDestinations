//Database setup
import cors from "cors";
import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { MongoClient, ServerApiVersion } from "mongodb";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(require("body-parser").json());
server.use(express.static("public"));
server.use(cors());

let uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("travelDestination");
const destinationCollection = db.collection("destinations");

server.get("/", async (req, res) => {
  const result = await destinationCollection.find().toArray();
  console.log(result);
  //__dirname means look from directory root
  res.sendFile("pages/index.html", { root: __dirname });
  res.status(200).json(result);
});

server.get("/form", (req, res) => {
  res.sendFile("pages/form.html", { root: __dirname });
});

server.post("/api/addDestination", async (req, res) => {
  const destination = req.body;
  const result = await destinationCollection.insertOne(destination);
  console.log(result.insertedId.toString());
  res.status(201).json({ message: destination });
});

server.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
