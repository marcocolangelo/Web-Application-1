'use strict';

const PORT = 3000 ;

//this will be the server side, the other one belongs to the client  

const express = require('express') ;
const morgan = require('morgan') ;

const dao = require('./films-dao') ;
const {Film,FilmLibrary} = require('./films');
const dayjs = require('dayjs');

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
        console.log(result);
    }).catch((error)=>{
        res.status(500).send(error) ;
    })
})

app.get('/api/films/filters/:filter', async (req,res)=>{
    const filter = req.params.filter;
    const films = await dao.listFilms();
    let filteredFilms = films;
    try {
        switch (filter) {
            case "favorites":
                console.log("Filtro favorites");
                filteredFilms = films.filter((f) => f.fav);
                break;
            case "best":
                console.log("Filtro best");
                filteredFilms = films.filter((f) => f.score==5);
                break;
            case "unseen":
                console.log("Filtro unseen");
                filteredFilms = films.filter((f) => f.date==undefined);
                break;
            case "seenLastMonth":
                console.log("Filtro seenLastMonth");
                filteredFilms = films.filter((f) => f.date != undefined && dayjs().diff(f.date,'month') <=1);
                break;
            
            default:
                console.log("Filtro sconosciuto");
                throw ( new Error("Filtro sconosciuto"));
                break;
        }
        res.json(filteredFilms);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/api/films/:filmId', async (req,res)=>{
    const id = req.params.filmId;
    const film = await dao.getFilm(id);
    
    try {
        res.json(film);
        console.log(film);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/api/films/add', async (req,res) => {
    const reqBody = req.body;
    const film = new Film(undefined,reqBody.title,reqBody.fav,reqBody.score,1,reqBody.date);

    try {
        await dao.addFilm(film);
        res.end();
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.put('/api/films/update/:filmId', async (req,res) => {
    const id = req.params.filmId;
    const info = req.body;

    try{
        await dao.updateFilm(id,info);
        res.end()
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.put('/api/films/update/score/:filmId', async (req,res) => {
    const id = req.params.filmId;
    const info = req.body;

    try{
        await dao.updateScore(id,info);
        res.end()
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.put('/api/films/update/favorite/:filmId', async (req,res) => {
    const id = req.params.filmId;
    const info = req.body;

    try{
        await dao.updateFav(id,info);
        res.end()
    }catch(error){
        res.status(500).send(error.message)
    }
})

app.delete('/api/films/:filmId', async (req,res) => {
    const id = req.params.filmId;
    
    try{
        await dao.deleteFilm(id);
        res.end()
    }catch(error){
        res.status(500).send(error.message)
    }
})



app.listen(PORT, 
    () => { console.log(`Server started on http://localhost:${PORT}/`) });