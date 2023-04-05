const express = require("express");

const app = express();

app.get ("/", function(req, res) {
    res.send("<h1>Who the fuck are you?</h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me at email: gsngdavid@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("This is David, I like basketball so much and I would like you to join me, I would mean a lot to me");
});

app.listen(3000, function() {
    console.log("The server is listening on port 3000");
});