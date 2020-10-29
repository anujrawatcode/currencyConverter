const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var options = {
        url : "https://apiv2.bitcoinaverage.com/convert/global",
        methord : "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    };
    
    request(options), function(error, response, body) {

        var data = JSON.parse(body);
        var price = data.last;
        var currentData = data.display_timestamp;

        res.write("<p>The current data is " + currentData+ "</p>");
        res.write();
        res.send("<h1>The current price of "+crypto+ " is "+price+fiat+"</h1>");
    }
});

app.listen(3000, function() {
    console.log("Sevrver started in 3000");
});