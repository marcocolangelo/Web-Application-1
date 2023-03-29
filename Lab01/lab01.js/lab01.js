'use strict';
const dayjs = require('dayjs');

//es 0
const strings = ["spring","cat","wood","no"];
let copy = Array.from(strings) ;
console.log("Initializing...");
copy.forEach((a,i,copy) => { copy[i] = a.slice(0,2) +  a.slice(-2);});
console.log("Finishing..."); 
console.log(strings);
console.log(copy);   


//es1
function Film(id,title,fav=false,date=undefined,score=undefined){
    this.id = id;
    this.title = title;
    this.fav = fav;
    this.date = date.toString();
    this.score = score;
} 


let film1 = new Film(1, "Pulp Fiction", true,dayjs(new Date(2023,2,10)), 5);
let film2 = new Film(2, "21 Grams", true, dayjs(new Date(2023,2,17)),  4);
let film3 = new Film(3, "Star Wars", false,dayjs(new Date(2023,4,21)));
    

//es2

function FilmLibrary(film=undefined){
    let films = [];

    this.addFilm =(film) => films.push(film);   //devi aggiustare qua

    this.ordering = function () {
        let ordFilms = films.sort((a,b) => a.date-b.date);
        console.log(...ordFilms);
    }     ;

    this.deleting = function (idParam){
        let search  = films.filter((a) => a.id==idParam)[0];
        const index = films.indexOf(search);
        films.splice(index,1);
        console.log(...films);
    };

    this.resetWatchedFilms = function(){
        films.forEach((a) => a.date=undefined );
        console.log(...films);
    }

    this.getRanked = function (){
        const rankedFilms = films.filter((a) => a.score!=undefined).sort((a,b) =>-( a.score-b.score));
        console.log(...rankedFilms);
    }
}

let filmLibrary = new FilmLibrary();
filmLibrary.addFilm(film1);
filmLibrary.addFilm(film2);
filmLibrary.addFilm(film3);

filmLibrary.ordering();

filmLibrary.deleting(2);

filmLibrary.resetWatchedFilms();

filmLibrary.getRanked();