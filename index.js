require('dotenv').config();
const express = require('express');
const server = express();
const http = require('http');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

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

//request & its types.

//get -- when we want to retrieve any data from server.
//post -- when we want to provide some data to server for processing.
//put -- singular data updates
//patch -- plural data update
//delete -- data delete.

server.get('/its-my-birthday', (req, res) => {
    console.log(req.body);
    return res.status(200).json({"success": true, "message": "Happy Birthday", "data": "Number for gift"});
});

server.post('/login', (req, res) => {
    const myCredentials = {
        "username": "admin",
        "password": "strong"
    };
    const { username, password } = req.body;
    if (username === undefined || username === '' || password === undefined || password === '') {
        return res.status(403).json({"status": false, "message": "Username & Password both is required"});
    }

    if (myCredentials['username'] === username && myCredentials['password'] === password) {
        return res.status(200).json({"status": true, "message": "Logged in successfully"});
    } else {
        return res.status(402).json({"status": false, "message": "Username or password is incorrect"})
    }

    // if (myCredentials['username'] === username) {
    //     if (myCredentials['password'] === password) {
    //         return res.status(200).json({"status": true, "message": "Logged in successfully"});
    //     } else {
    //         return res.status(402).json({"status": false, "message": "Password doesn't match in our records"});
    //     }
    // } else {
    //     return res.status(402).json({"status": false, "message": "User doesn't exist in our records"});
    // }
});

server.all('*', (req, res) => {
    return res.status(404).json({"status": false, "message": "Page/Endpoint is not found", "data": null});
});

http.createServer(server).listen(PORT, function (err) {
    if (err) console.log(`unable to start the server due to the reason here`, err);
    console.log(`server started on http://127.0.0.1:${PORT}`);
});














;