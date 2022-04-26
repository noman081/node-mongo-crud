const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

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
        /* const user = {
            name: 'Sharif Osman',
            age: 28,
            email: 'sharif@gmail.com'
        };
        const result = await userCollection.insertOne(user);
        console.log(`A user is created: ${result.insertedId}`); */

        app.post('/user', (req, res) => {
            const user = req.body;
            console.log(user);
            res.send(user);
        })
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log('Listening to port- ', port);
})