const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
   
    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        methord: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }
    

    request(options), function (error, response, body) {

        var data = JSON.parse(body);
        var price = data.last;

        console.log(price);

        var currentData = data.time;

        res.write("<p>The current data is " + currentData + "</p>");

        res.send("<h1>" + amount + crypto + " is currently" + price + fiat + "</h1>");

        res.send();
    }
    });



app.listen(3000, function () {
    console.log("Server started in 3000");
});