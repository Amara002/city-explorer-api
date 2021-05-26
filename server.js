'use strict'


const express = require('express');
// const cityData = require('./data/weather.json')
const server = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

server.use(cors());

const PORT = process.env.PORT;

// server.get('/weather',(req,res)=>{
// console.log(cityData);

// let cityNames = cityData.data.map(item=>{

// return item.name;

// })

// res.send(cityNames);


// })
// http://localhost:3001/weather?city=amman&lat=31.95&lon=35.91
server.get('/weather', locationHandler)
function locationHandler(req,res){
    // console.log(cityData);

    let cityName=req.query.city;
    let lat = req.query.lat
    let lon = req.query.lon 
    let key = process.env.UNSPLAH_KEY;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}&lat=${lat}&lon=${lon}`

    axios
        .get(url)
        .then(result => {
            console.log('inside promise')
            const weatherData = result.data.data.map(itemW => {
                return new weather(itemW);
            })
            res.send(weatherData);
        })
        .catch(err => {
            res.status(500).send(`error in getting the photo data ==> ${err}`);
        })
    // let cityNames = cityData.find(item=>{
    //     if (weatherNameData == item.city_name.toLowerCase() && lat == item.lat && lon == item.lon)
    
    // return item;
    
    // })
    
    // res.send(cityNames);
    console.log('after aaxios');

}
class weather {
    constructor(item){
        this.cityName = item.city_name;
        this.lat = item.lat;
        this.lon = item.lon;
    }
}





server.get('*',(req,res)=>{
    res.status(404).send('not found');
})

server.listen(PORT,() =>{
    console.log(`listening on PORT ${PORT}`);
})

