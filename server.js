const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app = express();
const PORT = 8080 || process.env.PORT;

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Use morgan and body parser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Make public a static dir
app.use(express.static(path.join(__dirname, 'public')));

// Use handlebars for templating
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

// Routes
require('./routes/scrapeRoutes')(app);

// Start server
app.listen(PORT, (err) => {
  if (!err) console.log(`Started Express server on port: ${PORT}`);
  else console.log(`Failed to start server due to an error: ${err}`);
});
