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

//Page rendering

server.get("/", async (req, res) => {
  res.sendFile("pages/index.html", { root: __dirname });
});

server.get("/form", (req, res) => {
  res.sendFile("pages/form.html", { root: __dirname });
});

//Get

server.get("/destinations", async (req, res) => {
  await Destination.find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.listen(5000, () => {
  console.log(`Listening on port 5000`);
});

//Post

server.post("/destination", async (req, res) => {
  const insertedDestination = new Destination({
    country: req.body.country,
    title: req.body.title,
    link: req.body.link,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    image: req.body.image,
    description: req.body.description,
  });
  insertedDestination
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Put

server.put("/destination/:id", async (req, res) => {
  await Destination.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log({ message: "Update successful", result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete

server.delete("/destination/:id", async (req, res) => {
  await Destination.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log({ message: "Delete successful", result });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
