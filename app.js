const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    // console.log(req.body);

    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;

    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jSONData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/d3e47a6b91"

    const options = {
        method: "POST",
        auth: "uddhavz:b89705711bb783d6e45d82025bf00e4d-us11"
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jSONData);
    request.end();

});



app.listen(3030, function () {
    console.log("Server is running on port 3030.");
})



//API Key : b89705711bb783d6e45d82025bf00e4d-us11

//List ID : d3e47a6b91