// https://www.robinwieruch.de/node-express-server-rest-api
const path = require('path');
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");

// create an instance of express to serve our end points
const buildPath = path.join(__dirname, '..', 'build');
const app = express();
app.use(express.static(buildPath));
app.use(cors())

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require("fs");
const { json } = require("express");

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://admin:admin@cluster0.6hmh1.mongodb.net/MappTask?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// client.connect(err => {
//     const users = client.db("MappTask").collection("users").find();
//     console.log("Connected, err: " + err);

//     users.each(function (err, res) {
//         console.log("err: " + err)
//         console.log(res)
//     });
//     // perform actions on the collection object

//     // client.close();
// });

app.get("/users", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
    // const users = client.db("MappTask").collection("users").find();
    // users.each(function (err, res) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(res)
    //     res.send(res)
    // });
});

app.post("/users", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        let dateFile = JSON.parse(data)
        data = dateFile.concat({ ...req.body, customerID: dateFile.length + 1 })
        fs.writeFile('./users.json', JSON.stringify(data), "utf8", (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send("OK");
        });
    });
});
app.put("/users/:userId", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        data = JSON.parse(data).filter(el => el.customerID != req.params.userId).concat(req.body)
        fs.writeFile('./users.json', JSON.stringify(data), "utf8", (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send("OK");
        });
    });
})
app.delete('/users/:userId', (req, res) => {

    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        data = JSON.parse(data).filter(el => el.customerID != req.params.userId)
        fs.writeFile('./users.json', JSON.stringify(data), "utf8", (err) => {
            if (err) {
                throw err;
            }
            res.status(200).send("OK, deleted users");
        });
    });

});


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log("listening on port %s...", server.address().port);
});