const path = require('path');
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

// setup express
const buildPath = path.join(__dirname, '..', 'build');
const app = express();
app.use(express.static(buildPath));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup mongo
const uri = "mongodb+srv://admin:admin@cluster0.6hmh1.mongodb.net/MappTask?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectToDb = (block) => {
    client.connect(err => {
        const collection = client.db("MappTask").collection("users");
        block(collection)
    });
}

// add routes
app.get("/users", (req, res) => {
    connectToDb(collection => {
        collection.find().toArray(function (err, data) {
            console.log(data);
            res.send(data);
        });
    });
});

app.post("/users", (req, res) => {
    connectToDb(collection => {
        collection.find().sort({ customerID: -1 }).limit(1).each((err, element) => {
            if (element != null) {
                console.log("==================")
                console.log(element)
                collection.insertOne({ ...req.body, customerID: element.customerID + 1 }).then((result) => {
                    console.log("insert: " + result)
                    res.status(200).send("OK");
                }).catch((err) => {
                    console.log("error: " + err)
                    res.status(500).send("Error");
                });
            }
        });
    });
});

app.put("/users/:userId", (req, res) => {
    connectToDb(collection => {
        console.log('=====================================');
        delete req.body._id
        console.log('without id', req.body)
        collection.updateOne({
            customerID: Number(req.params.userId)
        }, {
            $set: req.body
        }).then((result) => {
            console.log("update: " + result)
            res.status(200).send("OK");
        }).catch((err) => {
            console.log("error: " + err)
            res.status(500).send("Error");
        });
    });
})
app.delete('/users/:userId', (req, res) => {
    connectToDb(collection => {
        collection.deleteOne({
            customerID: Number(req.params.userId)
        }).then((result) => {
            console.log("delete: " + result)
            res.status(200).send("OK");
        }).catch((err) => {
            console.log("error: " + err)
            res.status(500).send("Error");
        });
    });
});

// start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log("listening on port %s...", server.address().port);
});