const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/', (req, res) => {
    res.send('Thanks for posting that!');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }); 