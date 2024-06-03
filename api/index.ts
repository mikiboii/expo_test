
const path = require('path');
 
const { createRequestHandler } = require('@expo/server/adapter/express');

const express = require("express");

const compression = require('compression');
const morgan = require('morgan');

const CLIENT_BUILD_DIR = path.join(process.cwd(), 'dist/client');
const SERVER_BUILD_DIR = path.join(process.cwd(), 'dist/server');


const app = express();

// app.get("/", (req, res) => res.send("Express on Vercel"));


app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

process.env.NODE_ENV = 'production';

app.use(
  express.static(CLIENT_BUILD_DIR, {
    maxAge: '1h',
    extensions: ['html'],
  })
);

app.use(morgan('tiny'));

app.all(
  '*',
  createRequestHandler({
    build: SERVER_BUILD_DIR,
  })
);

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;