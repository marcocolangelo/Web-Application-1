'use strict';


//es1
function Film(id,title,fav=false,date=undefined,score=undefined){
    this.id = id;
    this.title = title;
    this.fav = fav;
    this.date = dayjs(date.toString());
    this.score = score;

    this.setFav = (favourite) => {this.fav = favourite};
} 



//es2

function FilmLibrary(){

    let films = [];

    this.addFilm = function (f) { films.push(f); return films};   //devi aggiustare qua

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