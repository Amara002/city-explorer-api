'use strict'

require('dotenv').config();
const express = require('express');
const cityData = require('./data/weather.json')
const server = express();

const PORT = 3001 || process.env.PORT;

// server.get('/weather',(req,res)=>{
// console.log(cityData);

// let cityNames = cityData.data.map(item=>{

// return item.name;

// })

// res.send(cityNames);


// })

server.get('/weather',(req,res)=>{
    console.log(cityData);

    // let weatherNameData=req.query.weatherName
    let {lon, lat, searchQuery} = req.query;

    try {

        
        let cityNames = cityData.find(item=>{
            if (item.city_name.toLocaleLowerCase() == searchQuery.toLocaleLowerCase() && item.lon == lon && item.lat == lat) {
                
                return item;
            }
        })
        
        let weatherData = cityNames.data.map(item=>{
            return new Forecast(item,lon,lat,searchQuery)
        })
        
        res.send(weatherData);
    }
    catch(error) {
        res.send('These input values are invalid!')
    }
        
    })
    
class Forecast {
    constructor(item,lon,lat,city_name){

        this.description = item.weather.description;
        this.date = item.valid_date;
        this.lon = lon;
        this.lat = lat;
        this.city_name = city_name;
    }

}





server.get('*',(req,res)=>{
    res.status(404).send({
        "error": "Something went wrong."
      });
})

server.listen(PORT,() =>{
    console.log(`listening on PORT ${PORT}`);
})

