'use strict'


const express = require('express');
// const cityData = require('./data/weather.json')
const server = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

server.use(cors());

const PORT = process.env.PORT;


// http://localhost:3001/weather?city=amman&lat=31.95&lon=35.91
// https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=c034ccca829f46e0b7d36ad8291a3fcb&include=minutely
server.get('/weather', locationHandler)
function locationHandler(req, res) {
    // console.log(cityData);
    console.log(req.query);
    // let cityName=req.query.city;
    let searchQuery = req.query.searchQuery
    let key = process.env.UNSPLASH_KEY;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${key}&city=${searchQuery}`
    console.log("hiiiiiiii", url);
    axios
        .get(url)
        .then(result => {
            console.log('inside promise', result.data.city_name)
            const weatherData = result.data.data.map(itemW => {
                return new weather(itemW);
            })
            res.send(weatherData);

        })
        .catch(err => {
            res.status(500).send(`error in getting the weather data ==> ${err}`);
        })
    // let cityNames = cityData.find(item=>{
    //     if (weatherNameData == item.city_name.toLowerCase() && lat == item.lat && lon == item.lon)

    // return item;

    // })

    // res.send(cityNames);
    console.log('after aaxios');

}
class weather {
    constructor(item) {
        this.description = item.weather.description;
        this.date = item.valid_date;
    }
}
server.get('/movies', movieHandler)
function movieHandler(req, res) {
    let keyMovie = process.env.MOVIE_API_KEY;
    let movie = req.query.searchQuery;

    let urlMovie = `https://api.themoviedb.org/3/search/movie?api_key=${keyMovie}&query=${movie}`

    axios
        .get(urlMovie)
        .then(resultMovie => {
            console.log('movie>>>>>>>>>', resultMovie.data.results)
            const movieData = resultMovie.data.results.map(itemM => {
                return new Movie(itemM);

            })
            res.send(movieData);

        })
        .catch(err => {
            res.status(500).send(`error in getting the movie data ==> ${err}`);
        })

}
class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.total_votes = item.vote_count;
        this.average_votes = item.vote_average;
        this.imade_url = 'https://image.tmdb.org/t/p/w500' + item.poster_path;
        this.popularity = item.popularity;
        this.released_on = item.release_date;

    }
}




server.get('*', (req, res) => {
    res.status(404).send('not found');
})

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})

