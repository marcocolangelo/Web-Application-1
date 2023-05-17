const { Film, FilmLibrary } = require('./films');

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('films.db', (err) => {
    if (err) throw err;
});

function listQuestions() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films';
        db.all(sql, (err, rows) => {
            if (err)
                reject(err)
            else {
                const films = rows.map((f) => new Film(f.id,f.title,f.fav,f.score,f.date ));
                resolve(films);
            }
        });
    });
}