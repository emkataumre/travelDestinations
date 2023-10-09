//Database setup
import cors from "cors";
import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import mongoose from "mongoose";
import * as url from "url";
import Destination from "./schemas/destination.js";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(require("body-parser").json());
server.use(express.static("public"));
server.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/travelDestination");
server.get("/", async (req, res) => {
  //__dirname means look from directory root
  res.sendFile("pages/index.html", { root: __dirname });
});

server.get("/form", (req, res) => {
  res.sendFile("pages/form.html", { root: __dirname });
});
//should be addDestinations in order to follow REST standarts
server.post("/api/addDestination", async (req, res) => {
  // const destination = req.body;
  // const result = await destinationCollection.insertOne(destination);
  // console.log(result.insertedId.toString());
  // res.status(201).json({ message: destination });
});

server.get("/api/getDestinations", async (req, res) => {
  await Destination.find()
    .then((destinations) => {
      console.log(destinations);
      res.status(200).json(destinations);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
server.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
