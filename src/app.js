/*
const express = require('express');

const app = express();

app.get('', (req, res) => {
  //req for request and res for respond

  res.send('Hello Express!');
});

app.get('/help', (req, res) => {
  res.send('Help page');
});

app.get('/about', (req, res) => {
  //req for request and res for respond

  res.send('About Page');
});

app.get('/viewweather', (req, res) => {
  res.send('View Weather Page');
});
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
*/
/*
// Challenge 1
// 1. Setup about route to render a title with HTML
// 2. Setup a weather route to send back JSON
//     -Object with forecast and location strings
// 3. Test your work by visiting both in the browser

const express = require('express');

const app = express();

app.get('', (req, res) => {
  //req for request and res for respond

  res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Andrew',
      age: 27,
    },
    {
      name: 'Sarah',
    },
  ]);
});

app.get('/about', (req, res) => {
  //req for request and res for respond

  res.send('<h1>About</h1>');
});

app.get('/viewweather', (req, res) => {
  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia',
  });
});
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
*/

/*
// Challenge 2
// Goal: Create two more html File
// 1. Create a html page for about with "About" title
// 2. Create a html page for about with "Help" title
// 3. Remove the old route handlers for Both
// 4. Visit both in the browser to test your Work

const path = require('path');
const express = require('express');
const { title } = require('process');

//console.log(__dirname);

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public'); //path.join is a function

app.use(express.static(publicDirectoryPath));
app.get('/viewweather', (req, res) => {
  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia',
  });
});
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
*/

/*
// Goal: Create a template for help page

// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

const path = require("path");
const express = require("express");
const { title } = require("process");
const foreachasync = require("foreachasync");

//console.log(__dirname);

const app = express();

//const publicDirectoryPath = path.join(__dirname, "../public"); //path.join is a function

app.set("view engine", "hbs");
//app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rona Camarines",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text.",
  });
});

app.get("/viewweather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
*/

const path = require("path");
const express = require("express");
const { title } = require("process");
const foreachasync = require("foreachasync");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public"); //path.join is a function
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rona Camarines",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text.",
    name: "Andrew Mead",
  });
});

app.get("/viewweather", (req, res) => {
  if (!req.query.address) {
    //No address? Send back an error message
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  console.log(req.query.address); //Address? Send back the static JSON

  // res.send({
  //   forecast: "It is snowing",
  //   location: "Philadelphia",
  //   address: req.query.address, //Add address property onto JSON which returns the provided address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
