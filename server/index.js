// https://www.robinwieruch.de/node-express-server-rest-api
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");

// create an instance of express to serve our end points
const app = express();
app.use(cors())

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require("fs");
const { json } = require("express");

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/users", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});

app.post("/users", (req, res) => {
    fs.readFile('./users.json', "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        data = JSON.parse(data).concat(req.body)
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

const server = app.listen(3002, () => {
    console.log("listening on port %s...", server.address().port);
});