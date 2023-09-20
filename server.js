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

//Connect the server to the database
// (async function connectToDB(destinationData, res) {
//   try {
//     await client.connect();

//     const myDB = client.db("travelDestinations");
//     const myColl = myDB.collection("destinations");
//     //Establish a connection with the database and create some basic consts to reference docs and collections
//     const result = await addDataToDataBase(destinationData, myColl); //destination data is the parsed body from line 64

//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );

//     res.writeHead(201, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ destination: result.insertedId }));
//   } catch (error) {
//     if (error.code === 11000) {
//       // Handle duplicate key error
//       res.writeHead(400, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Data already exists." }));
//     } else {
//       console.error(error);
//       res.writeHead(500, { "Content-Type": "text-plain" });
//       res.end("Internal Server Error");
//     }
//   } finally {
//     await client.close();
//   }
// })()

//Inserts one doc in the database
// async function addDataToDataBase(destinationData, myColl) {
//   //once again the parsed body
//   const result = await myColl.insertOne(destinationData);
//   return result;
// }

// Connect to database
//       connectToDB(parsedBody, res).catch((error) => {
//         //Here we call the ConnectToDB function if we wanna post something. and we set up an error catcher
//         console.error(error);
//       });

//Express server setup

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
