import { Container, Navbar, Form, Button, Table,Row,Col} from 'react-bootstrap';
import {Tabella} from './Tabella';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState } from "react";
import {MyNavbar,VerticalMenu} from './MyNavbar';
import {Film,FilmLibrary} from "./lab01.js"
import dayjs from 'dayjs';

// Adding the films to the FilmLibrary
let mylibrary = new FilmLibrary();

mylibrary.add(new Film(1, "Pulp Fiction", true, 5));
mylibrary.add(new Film(2, "21 Grams", true, 4,"2023-03-17"));
mylibrary.add(new Film(3, "Star Wars", false,3,"2023-05-1"));
mylibrary.add(new Film(4, "Matrix", false,4,"2022-11-12"));
mylibrary.add(new Film(5, "Shrek", false, 4,"2023-03-21"));



function App() {
  
  const [lib,setLib] = useState(mylibrary)
  const [films,setFilms] = useState(mylibrary.films);
  const [filter,setFilter] = useState('All');
 

  //function to handle film adding, editing and removing
  const addFilm = (title, fav, score, date) => {
    const newId = Math.max(...mylibrary.films.map(a => a.id)) + 1;
    const newFilm = new Film(newId, title, fav, score, date);
    mylibrary.add(newFilm);

    setFilms((oldFilms) => {
      const newId = Math.max(...oldFilms.map(a => a.id)) + 1;
      const newFilm = new Film(newId, title, fav, score, date);
      return [...oldFilms, newFilm];
    });

    showAll();
  }

  const editFilm = (id,title, fav, score, date) => {
    mylibrary.films=mylibrary.films.map((ans) => (
      ans.id === id ? new Film(ans.id, title, fav, score, date) : ans
    ))
    setFilms((oldFilms) => (
      oldFilms.map((ans) => (
        ans.id === id ? new Film(ans.id, title, fav, score, date) : ans
      ))
    ));
  }

  const deleteFilm = (id) => {
    mylibrary.films = mylibrary.films.filter((ans) => (ans.id !== id));
    setFilms((oldFilms) => (oldFilms.filter((ans) => (ans.id !== id))));
  }

  //inserting filters to attach to the sideBar

  //favourite films filter
  const showFav = () => {
    
    setFilms(() => mylibrary.films.filter(f => f.fav));
    setFilter('Favourites');
  };

  const showBest = () => {
    setFilms(() => mylibrary.films.filter((a) => a.score == 5));
    setFilter('Best Films');
};

  const showLastMonth = () => {
    setFilms( () =>mylibrary.films.filter((a) => a.date != undefined && dayjs().diff(a.date,'days') <= 30 ));
    setFilter('Seen last month');
  }

  const showAll = () => {
    setFilms( mylibrary.films);
    setFilter('All');
  }

  const showUnseen = () =>{
    
    setFilms(() => mylibrary.films.filter((f) => f.date == undefined));
    setFilter('Undefined')
  }

  const changeFav = (id) => {
    
    
    mylibrary.films = mylibrary.films.map((ans) => 
            ans.id === id ? new Film(ans.id, ans.title, !ans.fav, ans.score, ans.date) : ans);

    setLib(mylibrary)
    
  }

  
 

  return <>
  <Container fluid>
      
        <MyNavbar ></MyNavbar>
      
   
      <Container fluid id='uppcont' style={{display:"grid" }}>
        
          <Col id="menucol">
            <VerticalMenu id='navbar-example3' favFilter={showFav} bestFilter={showBest} lastMonthFilter={showLastMonth} allFilter={showAll} unseenFilter={showUnseen}>
            </VerticalMenu>
          </Col>
          
          <Col id="tabcol">
            <Tabella id="tabella" films={films} filter={filter} changeFav={changeFav} addFilm={addFilm} editFilm={editFilm} deleteFilm={deleteFilm}></Tabella>
          </Col>
        
      </Container>
    
  </Container>
    </>
  
}

export default App
