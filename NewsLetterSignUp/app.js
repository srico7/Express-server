const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {  
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    apiKey : "0034a5608c11efe04f396619df1cdf64-us21",
    server : "us21" 
});
app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const listId = "bffbcae121";

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, { 
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            } 
        });

        res.sendFile(__dirname + "/success.html");
    }

    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
    });