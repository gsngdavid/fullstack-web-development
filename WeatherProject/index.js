const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/", function(req, res) {
    var cityName = req.body.cityName;
    var unit = "metric";
    const apiKey = "e930286656cfa0f12cfbf47bf8247ad6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;
    https.get(url, function(response) {
        response.on("data", function(data) {
            var weatherData = JSON.parse(data);
            var icon = weatherData.weather[0].icon;
            var imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            var description = weatherData.weather[0].description;
            var temperature = weatherData.main.temp;
            var country = weatherData.sys.country;
            res.write(`<h1>The temperature in ${cityName}, ${country} is ${temperature}, ${description}</h1>`);
            res.write(`<img src=${imageUrl}>`);
            res.send();
            
        })
    })
})


app.listen(3000, function() {
    console.log("Listening!");
});

