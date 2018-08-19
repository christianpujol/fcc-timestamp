// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp" , function(req, res) {
  const date = new Date()
  return res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
})
app.get("/api/timestamp/:dateString", function (req, res) {
  let date = req.params.dateString
  if (/^\d+$/.test(date)) {
    date = parseInt(date)
  }
  date = new Date(date)
  if (isNaN(date.getTime())) {
    return res.json({"error" : "Invalid Date" })
  }
  return res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
});

app.use(function (req, res, next) {
  res.status(404).send("not found")
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});