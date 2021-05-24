'use strict'


const express = require('express');
const cityData = require('./data/weather.json')
const server = express();

const PORT = 3001;

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
    
    let cityNames = cityData.find(item=>{
        if (item.name == 'Amman')
    
    return item;
    
    })
    
    res.send(cityNames);
    
})





server.get('*',(req,res)=>{
    res.status(404).send('not found');
})

server.listen(PORT,() =>{
    console.log(`listening on PORT ${PORT}`);
})

