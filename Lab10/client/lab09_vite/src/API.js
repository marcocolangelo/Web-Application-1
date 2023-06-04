//import { Film } from "./films";

const APIURL = 'http://localhost:3000/api'

async function listFilms() {
    try {
        const response = await fetch(APIURL+'/films');
        if (response.ok) {
            const questions = await response.json();
            return questions ;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}

async function filmFilter(filterLabel) {
    try {
        const response = await fetch(APIURL+`/films/filters/${filterLabel}`);
        if (response.ok) {
            const films = await response.json();
            console.log(films);
            return films ;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}



async function deleteFilm(filmId) {
    try {
        const response = await fetch(APIURL+`/films/${filmId}`, {
            method:'DELETE'
        });

        if (response.ok) {
            return true ;
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: "+error.message)
    }
}

async function upVote(answerId){
    try{
    //use a fetch to increase the vote in the database using a POST
    //this trigger the route in index.js
    const response  = await fetch(APIURL+`/answers/${answerId}/vote`, {
        //second fetch's parameter is an object containing method, headers and body (if needed) of the request
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({"vote":"up"}) //so i can send it as a string from a JSON object
        
    });

    if (response.ok){
        return true;
    } else {
        // if response is not OK because of application errors
        const message = response.text() ;
        throw new Error("Application error: "+ message) ;
    }

    //in case of network errors
    }catch(err){
        throw new Error("Network error:" + err.message);
    }
}

async function addFilm(title,fav,score,user,date){
    try{
        //use a fetch to increase the vote in the database using a POST
        //this trigger the route in index.js
        const response  = await fetch(APIURL+`/films/add`, {
            //second fetch's parameter is an object containing method, headers and body (if needed) of the request
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                "title": title,
                "fav": fav,
                "score": score,
                "user":user,
                "date":date //in this web app date is traited as a string 
            }) //so i can send it as a string from a JSON object
            
        });
    
        if (response.ok) {
            const id = Number(await response.text());
            return id;
        } else {
            const message = await response.text();
            throw new Error(response.statusText +" "+ message);
        }
    
        //in case of network errors
        }catch(err){
            throw new Error("Network error:" + err.message);
        }
}

async function updateFilm(title,fav,score,user,date,idFilm) {
    try {
        const response = await fetch(APIURL + `/films/update/${idFilm}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "fav": fav,
                "score": score,
                "user":user,
                "date":date //in this web app date is traited as a string 
            })
        });
        if (response.ok) {
            return true;
        } else {
            const message = response.text();
            throw new Error(response.statusText +" "+ message);
        }
    } catch (error) {
        throw new Error(error.message, {cause:error});
    }
}

export { listFilms, filmFilter,deleteFilm, addFilm, updateFilm };