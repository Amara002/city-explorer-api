'use strict'


const express = require('express');
// const cityData = require('./data/weather.json')
const server = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

server.use(cors());

const locationHandler = require('./modules/weather.js');
const movieHandler = require('./modules/movie.js');

const PORT = process.env.PORT;


// http://localhost:3001/weather?city=amman&lat=31.95&lon=35.91
// https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=c034ccca829f46e0b7d36ad8291a3fcb&include=minutely
server.get('/weather', locationHandler)

server.get('/movies', movieHandler)



server.get('*', (req, res) => {
    res.status(404).send('not found');
})

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})

