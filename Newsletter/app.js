const express = require('express');
const bodyParser = require("body-parser");
// const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));




mailchimp.setConfig({
  apiKey: "d83a7e5843b9cd7dfd9a45287b700372-us17",
  server: "us17"
});

const event = {
  name: "JS Developers Meetup"
};

const footerContactInfo = {
  company: "Mailchimp",
  address1: "675 Ponce de Leon Ave NE",
  address2: "Suite 5000",
  city: "Atlanta",
  state: "GA",
  zip: "30308",
  country: "US"
};

const campaignDefaults = {
  from_name: "Gettin' Together",
  from_email: "gettintogether@example.com",
  subject: "JS Developers Meetup",
  language: "EN_US"
};

async function run() {
  const response = await mailchimp.lists.createList({
    name: event.name,
    contact: footerContactInfo,
    permission_reminder: "permission_reminder",
    email_type_option: true,
    campaign_defaults: campaignDefaults
  });

  console.log(
    `Successfully created an audience. The audience id is ${response.id}.`
  );
}

run();



// app.get("/", function(req, res) {
//     res.sendFile(`${__dirname}/signup.html`);
// })

// app.post("/", function(req, res) {
//     const firstName = req.body.firstName;
//     const lastName = req.body.secondName;
//     const email = req.body.email;
    
//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed", 
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     }

//     const jsonData  = JSON.stringify(data);
//     const options = {
//         method: "POST",
//         auth: "David: d83a7e5843b9cd7dfd9a45287b700372-us17"
//     }

//     const url = "https://us17.admin.mailchimp.com/lists/eb4281af09"
//     const request = https.request(url, options, function(response) {
//         response.on("data", function(data) {
//             console.log(data.toString());
//         })
//     })

//     request.write(jsonData);
//     request.end();

// })

app.listen(3000, function() {
    console.log("Listening!");
})


function hex_to_ascii(str1) {
    var hex = str1. toString();
    var str = '';
    for (var n = 0; n < hex. length; n += 2) {
    str += String. fromCharCode(parseInt(hex. substr(n, 2), 16));
    }
    return str;
    }



// API Key
// d83a7e5843b9cd7dfd9a45287b700372-us17

// Id
// eb4281af09