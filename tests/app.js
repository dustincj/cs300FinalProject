const express = require('express')
const app = express();

    app.get('/', (req, res) => {
      res.status(200).send("Hello World!");
      })

    app.get('/login', (req, res) => {
      res.status(200).send("Hello World!");
      })

    app.get('/register', (req, res) => {
      res.status(200).send("Hello World!");
    })

    app.get('/index', (req, res) => {
      res.status(200).send("Hello World!");
      })

    app.get('/gmessage', (req, res) => {
      res.status(200).send("Hello World!");
      })

      module.exports = app;


