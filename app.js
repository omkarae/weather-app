// Creating constants for required packages


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
// Setting up path for static files
app.use(express.static("style"));
// Creating instance for bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// app.get
app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index1.html");
});

// app.post
app.post("/",function(req,res){
  // api endpoints
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = process.env.url + query + "&appid=" + apiKey + "&units=" + unit;

  // Calling an API with above endpoints
  https.get(url,function(response){
    // console.log(response.statusCode);
    if(response.statusCode=== 200)
    {
      response.on("data",function(data){
        // Getting data from API and storing it in json weatherdata
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.feels_like;
        const city = weatherdata.name;
        const desc = weatherdata.weather[0].description;
        const id = weatherdata.weather[0].icon
        const imgUrl = "http://openweathermap.org/img/wn/" + id + "@2x.png"
        // Writing elements to send
        res.write("<br>");
        res.write("<br>");
        res.write("<br>");
        res.write("<br>");
        res.write("<br>");
        res.write("<br>");
        res.write("<br>");
        res.write("<br>");
        res.write("<br>");
        res.write("<h1><center> Temperature in " + city + " is " + temp + " degree celcius.</center></h1>");
        res.write("<h2><center>The weather is currently " + desc + "</center></h2>\n");
        res.write("<center><img src=" + imgUrl+"></center>");
        // res.sendFile(__dirname + "index2.html")
        res.send();
        // console.log(city);
        // console.log(temp + " C");
        // console.log(desc);
      })
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  });
  // res.send("Server is up and running");
});
app.post("/failure", function(req,res){
  res.redirect("/");
})
// Listening to localhost:3000
app.listen(process.env.PORT || 3000,function(){
  console.log("The server is running on the port 3000.");
})
