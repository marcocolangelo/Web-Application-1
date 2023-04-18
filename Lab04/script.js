'use strict';
let f1 = new Film(1, "Pulp Fiction", true,dayjs(new Date(2023,2,10)), 5);
let f2 = new Film(2, "21 Grams", true, dayjs(new Date(2023,3,17)),  4);
let f3 = new Film(3, "Star Wars", false,dayjs(new Date(2023,4,21)),3);

// Adding the films to the FilmLibrary
const library = new FilmLibrary();
let films = library.addFilm(f1);
films = library.addFilm(f2);
films = library.addFilm(f3);

console.log(films);

function createAnswerRow(film){
        

    const tr = document.createElement('tr');
    // tr.innerHTML = `<td>${answer.date}</td><td>${answer.text}</td>` ;

    const ttext = document.createElement('td');
    ttext.innerText = film.title;
    tr.appendChild(ttext);

    const tfav = document.createElement('td');
    tfav.classList.add("checkcol");
    tfav.innerHTML = `<input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">`;
    const checkbox = tfav.lastChild;
    checkbox.checked = film.fav;
    tr.appendChild(tfav);

    const tdate = document.createElement('td');
    tdate.innerText = film.date.format('DD/MM/YYYY');
    tr.appendChild(tdate);

    const tscore = document.createElement('td');
    tscore.innerText = Number(film.score);
    tr.appendChild(tscore);

    
    const checkButton = tfav.lastChild;


    checkButton.addEventListener('change',(event) => {
        /*you have to implement the eventListener appied on change for the check-button in the table*/ 
        const checkbox = event.target;
        film.setFav(checkbox.checked);

        /*but remember that until you won't introduce a sqlite3 implementation this change will not occur the data*/ 
   

    }); 

    

    return tr;
}


document.addEventListener('DOMContentLoaded', (event) => {
    /*// Seleziona l'elemento con position: fixed;

    // Imposta il valore massimo di y oltre il quale l'elemento non deve scorrere
    var maxY = 100;

    // Aggiungi un listener per l'evento scroll sulla finestra
    window.addEventListener('scroll', function () {
        var fixedElement = document.querySelector('#leftmenu');

        // Ottieni la posizione di scorrimento corrente della pagina
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Controlla se la posizione di scorrimento supera il valore massimo di y
        if (scrollTop > maxY) {
            // Imposta la posizione dell'elemento in modo che non scorra oltre il valore massimo di y
            fixedElement.style.top = (scrollTop - maxY) + 'px';
        } else {
            // Ripristina la posizione originale dell'elemento
            fixedElement.style.top = '0px';
        }
    });*/

    const filter = document.getElementById('filterused');
    const table = document.getElementById('answertable');
    // const tableBody = table.childNodes[1] ;
    const tableBody = table.querySelector('tbody');

    for (let f of films){
        const tr = createAnswerRow(f);
        tableBody.appendChild(tr);
    }

//all films menu 
    const allMenu = document.getElementById('toptextmenu'); 
    const favMenu = document.getElementById('favmenu');
    const bestMenu = document.getElementById('bestmenu');
    const seenMenu = document.getElementById('lastmonthmenu');


    allMenu.addEventListener('click',(event) => {
        filter.innerText = "All";
        allMenu.style.backgroundColor="cornflowerblue"
        favMenu.style.backgroundColor="aliceblue";
        bestMenu.style.backgroundColor="aliceblue";
        seenMenu.style.backgroundColor="aliceblue";
        
       while (tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
       } 

        for (let f of films){
            const tr = createAnswerRow(f);
            tableBody.appendChild(tr);
            console.log("Inserting a new child");
        }
    });

    


//favourite films menu
    
    favMenu.addEventListener('click',(event) => {
        filter.innerText = "Favourite Films";
        allMenu.style.backgroundColor="aliceblue";
        bestMenu.style.backgroundColor="aliceblue";
        seenMenu.style.backgroundColor="aliceblue";
        favMenu.style.backgroundColor="cornflowerblue";
        favMenu.style.color="white";

        while (tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
       } 

       for (let f of library.getFav()){
            const tr = createAnswerRow(f);
            tableBody.appendChild(tr);
            console.log("Inserting a new child");
       }

    });

//best films menu
    
    
    bestMenu.addEventListener('click',(event) => {
        filter.innerText = "Best Films";
        while (tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
       } 

       for (let f of library.getBest()){
            const tr = createAnswerRow(f);
            tableBody.appendChild(tr);
            console.log("Inserting a new child");
       }

    })

    //seen last month menu
    
    seenMenu.addEventListener('click',(event) => {

        console.log(dayjs().month());

        filter.innerText = "Seen Last Month Films";
            while (tableBody.firstChild){
                tableBody.removeChild(tableBody.firstChild);
        } 

        for (let f of library.seenLastMonth()){
                const tr = createAnswerRow(f);
                tableBody.appendChild(tr);
                console.log("Inserting a new child");
        }
    });

});

    

