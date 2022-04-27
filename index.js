const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to my CRUD server');
})

//mongodb
/* username: dbuser1
password: xJn5AssHD59fQ8dp */



const uri = "mongodb+srv://dbuser1:xJn5AssHD59fQ8dp@cluster0.v6azo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        const adminCollection = client.db("foodExpress").collection("admin");

        //get user
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        //get single user
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        // add a user
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log('user created!');
            res.send(result);
        })

        // delete a user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        //POST: Add an Admin
        app.post('/admin', async (req, res) => {
            const admin = req.body;
            const result = await adminCollection.insertOne(admin);
            console.log('Admin Createrd!');
            res.send(result);
        })
        // GET add admin data
        app.get('/admin', async (req, res) => {
            const query = {};
            const cursor = adminCollection.find(query);
            const admin = await cursor.toArray();
            res.send(admin);

        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log('Listening to port- ', port);
})