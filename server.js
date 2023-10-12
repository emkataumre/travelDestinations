//Database setup
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as url from "url";
import Destination from "./schemas/destination.js";
import User from "./schemas/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import passportJWT from "passport-jwt";
dotenv.config();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));
server.use(cors());

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwt_secret,
};
const strategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  next
) {
  const user = await User.findOne({ _id: jwt_payload._id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);
server.use(passport.initialize());

mongoose.connect("mongodb://127.0.0.1:27017/travelDestination");

//Page rendering

server.get("/", async (req, res) => {
  res.sendFile("pages/index.html", { root: __dirname });
});

server.get("/form", (req, res) => {
  res.sendFile("pages/form.html", { root: __dirname });
});

server.get("/login", (req, res) => {
  res.sendFile("pages/login.html", { root: __dirname });
});

server.get("/create", (req, res) => {
  res.sendFile("pages/create.html", { root: __dirname });
});

server.get(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.query.id) return res.send("No id provided");
    res.sendFile("pages/update.html", { root: __dirname });
  }
);

//Get
server.get("/api/destinations", async (req, res) => {
  await Destination.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.get("/api/destination/:id", async (req, res) => {
  await Destination.findOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Post
server.post("/api/auth/login", async (req, res) => {
  await User.findOne({ name: req.body.name })
    .exec()
    .then(async (result) => {
      if (result.length !== 0) {
        //assign jwt token
        if (await result.isValidPassword(req.body.password)) {
          const generatedToken = jwt.sign(
            { _id: result._id },
            process.env.jwt_secret
          );
          res.status(200).json({ token: generatedToken, status: "Success" });
          return;
        } else {
          res.status(500).json({ error: "Failed to login", status: "Failure" });
        }
      } else {
        res.status(409).json({ error: "User not found", status: "Failure" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.post("/api/auth/signup", async (req, res) => {
  await User.find({ name: req.body.name })
    .exec()
    .then((result) => {
      if (result.length === 0) {
        const insertedUser = new User({
          name: req.body.name,
          password: req.body.password,
        });
        insertedUser
          .save()
          .then((result) => {
            res.status(201).json(insertedUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        res.status(409).json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.post("/api/destination", async (req, res) => {
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
      res.status(201).json({ status: "Success", result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: "Failure", error: err.message });
    });
});

//Put
server.put(
  "/api/destination/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Destination.updateOne({ _id: req.params.id }, req.body)
      .then((result) => {
        res.status(201).json({ status: "Successful", result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ status: "Failure", error: err.message });
      });
  }
);

//Delete
server.delete(
  "/api/destination/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Destination.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(201).json({ status: "Successful", result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ status: "Failure", error: err.message });
      });
  }
);

server.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
