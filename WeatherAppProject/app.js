const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
    });

app.post('/', (req, res) => {
const query = 'req.body.cityName';
const apiKey = '0bee78ecee5ef85efb6661a3ee32eb15';
const unit = 'metric';
const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units =' + unit;


    https.get(url, (res) => {
        console.log(res.statusCode); 

    

    res.on('data', (data) => {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    console.log(temp);
    console.log(weatherDescription);
    console.log(icon);

    res.write('<p>The weather is currently ' + weatherDescription + '</p>');
    res.write('<h1>The temperature in London is ' + temp + ' degrees Celcius.</h1>');
    res.write('<img src="http://openweathermap.org/img/wn/' + icon + '.png">');
    res.send();
    
        });

    });



app.listen(8080, function() {
    console.log('Server is running on port 8080');
});

