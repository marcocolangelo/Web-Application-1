'use strict';

import dayjs from 'dayjs';

//es1
function Film(id,title,fav,score,date=undefined){
    this.id = id;
    this.title = title;
    this.fav = fav;
    this.date = date && dayjs(date);
    this.score = score;
    this.setFav = (favourite) => {this.fav = favourite};
} 



//es2

function FilmLibrary(){

    this.films = [];

    this.add =  function (film) { this.films.push(film)}; 

    this.ordering = function () {
        let ordFilms = films.sort((a,b) => a.date-b.date);
        console.log(...ordFilms);
    }     ;

    this.deleting = function (idParam){
        let search  = films.filter((a) => a.id==idParam)[0];
        const index = films.indexOf(search);
        this.films.splice(index,1);
        console.log(...films);
    };

    this.resetWatchedFilms = function(){
        this.films.forEach((a) => a.date=undefined );
        console.log(...films);
    }

    this.getRanked = function (){
        const rankedFilms = films.filter((a) => a.score!=undefined).sort((a,b) =>-( a.score-b.score));
        console.log(...rankedFilms);
    }

    this.getFav = function(){
        const favFilms = films.filter((a) => a.fav );
        return favFilms;
    }

    this.getBest = function (){
        const bestFilm = films.filter((a) => a.score == 5);
        return bestFilm;
    };

    this.seenLastMonth = function(){
        const seenFilm = films.filter((a) => {a.date.month() == 2});
        console.log(seenFilm);
        return seenFilm;
    }
}


export {Film,FilmLibrary}