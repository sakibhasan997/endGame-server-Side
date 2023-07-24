const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MONGODB START

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7suhtvy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const collegeSixCardCollection = client
      .db("EndGame-Project")
      .collection("collegeSixCard");
    const collegeThreeCardCollection = client
      .db("EndGame-Project")
      .collection("collegeThreeCard");

    // get six card api
    app.get("/sixCard", async (req, res) => {
      const result = await collegeSixCardCollection.find().toArray();
      res.send(result);
    });
    // get three card api
    app.get("/threeCard", async (req, res) => {
      const result = await collegeThreeCardCollection.find().toArray();
      res.send(result);
    });

    // collegeSixCard details data
    app.get("/sixCard/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await collegeSixCardCollection.findOne(query);
      res.send(result);
    });
    // collegeThreeCard details data
    app.get("/threeCard/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await collegeThreeCardCollection.findOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// MONGODB END

app.get("/", (req, res) => {
  res.send("Hello Brother EndGame is Running Now You Can Do This");
});

app.listen(port, () => {
  console.log(`server site is running port: ${port}`);
});
