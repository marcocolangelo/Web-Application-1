'use strict';

const PORT = 3000 ;

//this will be the server side, the other one belongs to the client  

const express = require('express') ;
const morgan = require('morgan') ;

const dao = require('./films-dao') ;
const {Film,FilmLibrary} = require('./films');

const app = express();
app.use(morgan('combined'));
app.use(express.json());

//get the list of all films with full details
app.get('/api/films', (req, res)=>{
    //we have the right JS function yet, it's listFilms
    //from films-dao.js

    //but remember that it's a Promise because of database's async nature
    dao.listFilms().then((result)=>{
        //it sends a JSON of the result
        res.json(result) ;
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})