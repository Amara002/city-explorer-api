const axios = require('axios');
const weatherKey = process.env.UNSPLASH_KEY;


let in_memory = {};

function locationHandler(req, res) {
    // console.log(cityData);
    console.log(req.query);
    // let cityName=req.query.city;
    let searchQuery = req.query.searchQuery

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&city=${searchQuery}`
    console.log("hiiiiiiii", url);

    if(in_memory[searchQuery] !== undefined){
        console.log('weather>>>>', in_memory[searchQuery]);
        res.send(in_memory[searchQuery]);
    }else {
        
        axios
        .get(url)
        .then(result => {
            console.log('inside promise', result.data.city_name)
            const weatherData = result.data.data.map(itemW => {
                return new weather(itemW, searchQuery);
            })
            in_memory[searchQuery] = weatherData;
            console.log('insertWeather>>>>', in_memory[searchQuery]);
            res.send(weatherData);

        })
        .catch(err => {
            res.status(500).send(`error in getting the weather data ==> ${err}`);
        })
    }
    // let cityNames = cityData.find(item=>{
        //     if (weatherNameData == item.city_name.toLowerCase() && lat == item.lat && lon == item.lon)

    // return item;
    
    // })
    
    // res.send(cityNames);
    console.log('after aaxios');

}
class weather {
    constructor(item, city) {
        this.description = item.weather.description;
        this.date = item.valid_date;
        this.city_name = city;
    }
}
module.exports = locationHandler;
