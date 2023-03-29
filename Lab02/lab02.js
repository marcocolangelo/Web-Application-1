/* 
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 1 - Exercise 2
 */

'use strict';
const { Dayjs } = require("dayjs");
const dayjs = require("dayjs");
const sqlite = require("sqlite3");

function Film(id, title, isFavorite = false, watchDate, rating) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object
  this.watchDate = watchDate && dayjs(watchDate);

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favorite}, ` +
    `Watch date: ${this.formatWatchDate('MMMM D, YYYY')}, ` +
    `Score: ${this.formatRating()}` ;
  }

  this.formatWatchDate = (format) => {
    return this.watchDate ? this.watchDate.format(format) : '<not defined>';
  }

  this.formatRating = () => {
    return this.rating  ? this.rating : '<not assigned>';
  }
}


function FilmLibrary() {
  this.list = [];

  this.print = () => {
    console.log("***** List of films *****");
    this.list.forEach((item) => console.log(item.toString()));
  }

  this.addNewFilm = (film) => {
    if(!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicate id');
  };

  this.deleteFilm = (id) => {
    const newList = this.list.filter(function(film, index, arr) {
      return film.id !== id;
    })
    this.list = newList;
  }

  this.resetWatchedFilms = () => {
    this.list.forEach((film) => delete film.watchDate);
  }

  this.getRated = () => {
    const newList = this.list.filter(function(film, index, arr) {
      return film.rating > 0;
    })
    return newList;
  }

  this.sortByDate = () => {
    const newArray = [...this.list];
    newArray.sort((d1, d2) => {
      if(!(d1.watchDate)) return  1;   // null/empty watchDate is the lower value
      if(!(d2.watchDate)) return -1;
      return d1.watchDate.diff(d2.watchDate, 'day')
    });
    return newArray;
  }

  //this function returns all the films stored into the DB
  this.getAllStoredFilm = () => {
    return new Promise((resolve,reject) => {
      const sql = `SELECT * FROM films`
      const db = new sqlite.Database('films.db',(err) => {if (err) throw err;});
      db.all(sql,(err,rows) => {
        if (err){
          reject(err);
        }else{
          
          const films = rows.map((f) => new Film(f.id,f.title,f.favorite,f.watchDate,f.rating)  );
          resolve(films);
        }
      });

      db.close();
    }); 
  }

  //this function returns all the favorite films stored into the DB
  this.getAllFavouriteFilm = () => {
    return new Promise((resolve,reject) => {
      const sql = `SELECT * FROM films WHERE favorite = 1`
      const db = new sqlite.Database('films.db',(err) => {if (err) throw err;});
      db.all(sql,(err,rows) => {
        if (err){
          reject(err);
        }else{
          
          const films = rows.map((f) => new Film(f.id,f.title,f.favorite,f.watchDate,f.rating)  );
          resolve(films);
        }
      });

      db.close();
    }); 
  }

  //this function returns all the films watched today stored into the DB
  this.getAllSeenTodayFilms = () => {
    return new Promise((resolve,reject) => {
      const sql = `SELECT * FROM films WHERE watchdate = ?`
      const db = new sqlite.Database('films.db',(err) => {if (err) throw err;});
      db.all(sql,[dayjs()],(err,rows) => {
        if (err){
          reject(err);
        }else{
          
          const films = rows.map((f) => new Film(f.id,f.title,f.favorite,f.watchDate,f.rating)  );
          resolve(films);
        }
      });

      db.close();
    });
  }

  //this function returns all the films whatched before a specific data passed as argument 
  this.getAllSeenBeforeFilms = (watchedDate) => {
    return new Promise((resolve,reject) => {
      const sql = `SELECT * FROM films WHERE watchdate <= ?`
      const db = new sqlite.Database('films.db',(err) => {if (err) throw err;});
      db.all(sql,[watchedDate],(err,rows) => {
        if (err){
          reject(err);
        }else{
          
          const films = rows.map((f) => new Film(f.id,f.title,f.favorite,f.watchDate,f.rating)  );
          resolve(films);
        }
      });

      db.close();
    });
  }

  this.storeNewFilm = (film) => {
    return new Promise((resolve,reject) => {
      const sql = `INSERT INTO films(id,title,favorite,watchdate,rating) VALUES (?,?,?,?,?)`;
      const db = new sqlite.Database('films.db',(err) => {if (err) throw err;});
      db.all(sql,[film.id,film.title,film.favorite,film.watchDate,film.rating],(err,rows) => {
        if (err){
          reject(err);
        }else{
          resolve(true);
        }
      });

      db.close();
    });
  }

  this.deleteStoredFilm = (id) => {
    return new Promise((resolve,reject) => {
      const sql = `DELETE FROM films WHERE id = ?`;
      const db = new sqlite.Database('films.db',(err) => {if (err) throw err;});
      db.all(sql,[id],(err) => {
        if (err){
          reject(err);
        }else{
          resolve(true);
        }
      });

      db.close();
    });
  }

  this.deleteDateStoredFilm = () => {
    return new Promise((resolve,reject) => {
      const sql = `UPDATE films SET watchdate = NULL`;
      const db = new sqlite.Database('films.db',(err) => {if (err) throw err;});
      db.all(sql,(err) => {
        if (err){
          reject(err);
        }else{
          resolve(true);
        }
      });

      db.close();
    });
  }
}


function main() {
  // Creating some film entries
  const f1 = new Film(1, "Pulp Fiction", true, "2023-03-10", 5);
  const f2 = new Film(2, "21 Grams", true, "2023-03-17", 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, "2023-03-21", 3);

  // Adding the films to the FilmLibrary
  const library = new FilmLibrary();
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);
  library.addNewFilm(f4);
  library.addNewFilm(f5);

  // Print Sorted films
  //console.log("***** List of films (sorted) *****");
  //const sortedFilms = library.sortByDate();
  //sortedFilms.forEach((film) => console.log(film.toString()));

  // Deleting film #3
  library.deleteFilm(3);

  // Reset dates
  library.resetWatchedFilms();

  // Printing modified Library
  //library.print();

  // Retrieve and print films with an assigned rating
  //console.log("***** Films filtered, only the rated ones *****");
  //const ratedFilms = library.getRated();
  //ratedFilms.forEach((film) => console.log(film.toString()));

  // Retrive an array of Films from the db and print films stored into it
  /*const storedFilms = library.getAllStoredFilm().then((f) => { 
    let a = Array.from(f);
    a.forEach((f) => console.log(f));
    console.log("Split between the two functions");
  }).catch((err) => {
    throw err;
  });*/

  

  //get an array of favourite Film from the db
  /*const favFilms = library.getAllFavouriteFilm().then((f) => { 
    let a = Array.from(f);
    a.forEach((f) => console.log(f));
    console.log("Split between the two functions");
  }).catch((err) => {
    throw err;
  });*/

  //get an array of films watched today from the db
 /* const seenFilms = library.getAllSeenTodayFilms().then((f) => { 
    let a = Array.from(f);
    a.forEach((f) => console.log(f));
    console.log("Split between the two functions");
  }).catch((err) => {
    throw err;
  });*/

  //get an array of films watched before a specific date from the db
  /*const watchedBeforeFilms = library.getAllSeenBeforeFilms("2023-03-21").then((f) => { 
    let a = Array.from(f);
    a.forEach((f) => console.log(f));
    console.log("Split between the two functions");
  }).catch((err) => {
    throw err;
  });*/

  //insert a new film into the db
  const f6 = new Film(6, "Natale ai caraibi", true, '2023-03-19', 3);
 // library.storeNewFilm(f6).then(() => console.log("Inserimento completato")).catch(() => console.log("Inserimento fallito"));

 library.deleteStoredFilm(6).then(() => console.log("Eliminazione completata")).catch(() => console.log("Eliminazione fallita"));
  
 library.deleteDateStoredFilm().then(() => console.log("Eliminazione data completata")).catch(() => console.log("Eliminazione data fallita"))


  // Additional instruction to enable debug 
  debugger;
}

main();
