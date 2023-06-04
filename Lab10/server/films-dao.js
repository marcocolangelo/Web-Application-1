const { Film, FilmLibrary } = require('./films');

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

function listFilms() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                //qui si usa favorite,rating,watchDate ecc. perchè in input un oggetto row che segue la convenzione DEL DB
                const films = rows.map((f) => new Film(f.id,f.title,f.favorite,f.rating,1,(f.watchdate == null || f.watchdate == "2000-12-31T23:00:00.000Z")? "" : dayjs(f.watchdate)));
                resolve(films);
            }
        });
    });
}

function getFilm(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE id = ?';
        db.all(sql,[id], (err, rows) => {
            if (err)
                reject(err)
            else {
                //qui si usa favorite,rating,watchDate ecc. perchè in input un oggetto row che segue la convenzione DEL DB
                const films = rows.map((f) => new Film(f.id,f.title,f.favorite,f.rating,1,dayjs(f.watchdate)));
                resolve(films);
            }
        });
    });
}

function addFilm(film){
    return new Promise((resolve,reject) => {
        // NOTE: film.id is ignored because the database will generate an auto-incremental ID
        const sql = 'INSERT INTO FILMS(title,favorite,watchdate,rating,user) VALUES (?,?,?,?,1)';
        //qui si usa fav,score,date ecc. perchè in input un oggetto Film film che segue la convenzione MIA
        db.run(sql,[film.title,film.fav,(!film.date || film.date == "2000-12-31T23:00:00.000Z")? null : dayjs(film.date).toISOString(),film.score],(err) => {
            if (err){
                console.log("Error in addFilm");
                console.log(`${film.fav}`);
                 reject(err);
            }else{
                resolve(true);
            }
        })
    })
}

function updateFilm(id, info){
    return new Promise((resolve,reject) => {
        const sql = `UPDATE films
        SET title=?, favorite=?, watchdate=?, rating=?, user=?
        WHERE id=?` ;
        //qui si usa fav,score,date ecc. perchè in input un oggetto Film film che segue la convenzione MIA
        db.run(sql,[info.title,info.fav,info.date ? dayjs(info.date).toISOString() : null,info.score,info.user,id],
            (err) => {
                if (err){
                    console.log("Errore in updateFilm");
                    reject(err);
                }else{
                    resolve(true);
                }
            })
    })
}

function updateScore(id, info){
    return new Promise((resolve,reject) => {
        const sql = `UPDATE films
        SET rating=?
        WHERE id=?` ;

        db.run(sql,[info.score,id],
            (err) => {
                if (err){
                    console.log("Errore in updateScore");
                    reject(err);
                }else{
                    resolve(true);
                }
            })
    })
}

function updateFav(id, info){
    return new Promise((resolve,reject) => {
        const sql = `UPDATE films
        SET favorite=?
        WHERE id=?` ;

        db.run(sql,[info.fav,id],
            (err) => {
                if (err){
                    console.log("Errore in updateFav");
                    reject(err);
                }else{
                    resolve(true);
                }
            })
    })
}

function deleteFilm(id){
    return new Promise((resolve,reject) => {
        const sql = ' DELETE FROM films WHERE id=?';

        db.run(sql,[id],
            (err) => {
                if (err){
                    console.log("Errore in deleteFilm");
                    reject(err);
                }else{
                    resolve(true);
                }
            })
    })
}


exports.listFilms = listFilms;
exports.addFilm = addFilm;
exports.getFilm = getFilm;
exports.updateFilm = updateFilm;
exports.updateScore = updateScore;
exports.updateFav = updateFav;
exports.deleteFilm = deleteFilm;