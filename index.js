require('dotenv').config();
const PORT = process.env.PORT || 4000;

const express = require('express');
const server = express();
const http = require('http');

const bodyParser = require('body-parser');

server.use((req, res, next) => {
    bodyParser.json()(req, res, err => {
        if (err) {
            return res.status(406).json({"status": false, "message": "Json Object passed is incorrect/invalid", "data": null});
        }
        next();
    })
})

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.all('*', (req, res) => {
    return res.status(404).json({"status": false, "message": "Page/Endpoint is not found", "data": null});
});

http.createServer(server).listen(PORT, function (err) {
    if (err) console.log(`unable to start the server due to the reason here - ${err}`);
    console.log(`server started on http://127.0.0.1:${PORT}`);
})














;