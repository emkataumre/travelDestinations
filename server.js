//Database setup
import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { MongoClient, ServerApiVersion } from "mongodb";
const server = express();
server.use(require("body-parser").json());

let uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Connect the server to the database
async function connectToDB(destinationData, res) {
  try {
    await client.connect();

    const myDB = client.db("travelDestinations");
    const myColl = myDB.collection("destinations");
    //Establish a connection with the database and create some basic consts to reference docs and collections
    const result = await addDataToDataBase(destinationData, myColl); //destination data is the parsed body from line 64

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ destination: result.insertedId }));
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Data already exists." }));
    } else {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text-plain" });
      res.end("Internal Server Error");
    }
  } finally {
    await client.close();
  }
}

//Inserts one doc in the database
async function addDataToDataBase(destinationData, myColl) {
  //once again the parsed body
  const result = await myColl.insertOne(destinationData);
  return result;
}

// Connect to database
//       connectToDB(parsedBody, res).catch((error) => {
//         //Here we call the ConnectToDB function if we wanna post something. and we set up an error catcher
//         console.error(error);
//       });

//Express server setup

server.post("/api/addDestination", (req, res) => {
  res.json({ message: req.body });
});

server.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
