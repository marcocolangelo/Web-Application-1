import { Container, Navbar, Form, Button, Table,Row,Col} from 'react-bootstrap';
import {Tabella} from './Tabella';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import './App.css'
import { useState } from "react";
import {MyNavbar,VerticalMenu} from './MyNavbar';
import {Film,FilmLibrary} from "./lab01.js"

// Adding the films to the FilmLibrary
let mylibrary = new FilmLibrary();

mylibrary.add(new Film(1, "Pulp Fiction", true, "2023-03-10", 5));
mylibrary.add(new Film(2, "21 Grams", true, "2023-03-17", 4));
mylibrary.add(new Film(3, "Star Wars", false,"2023-03-10",3));
mylibrary.add(new Film(4, "Matrix", false,"2023-11-12",4));
mylibrary.add(new Film(5, "Shrek", false, "2023-03-21", 3));



function App() {

  const [films,setFilms] = useState([...mylibrary.films])
  const [filter,setFilter] = useState('All');

  //inserting filters to attach to the sideBar

  //favourite films filter
  const showFav = () => {
    setFilms((films) => films.filter(f => f.fav));
    setFilter('Favourites');
  };

  const showBest = () => {
    setFilms((bestFilm) => films.filter((a) => a.score == 5));
    setFilter('Best Films');
};

  const showLastMonth = () => {
    setFilms(seenFilm => films.filter((a) => {a.date.month() == 2}));
    setFilter('Seen last month');
  }

  const showAll = () => {
    setFilms((films) => [...mylibrary.films]);
    setFilter('All');
  }


  return <>
      <header>
        <MyNavbar ></MyNavbar>
      </header>
    <main>
      <Container fluid id='uppcont' style={{display:"grid"}}>
        
          <Col id="menucol">
            <VerticalMenu id='navbar-example3' favFilter={showFav} bestFilter={showBest} lastMonthFilter={showLastMonth} allFilter={showAll} >
            </VerticalMenu>
          </Col>
          
          <Col id="tabcol">
            <Tabella id="tabella" libFilms={films} filter={filter}></Tabella>
          </Col>
        
      </Container>
    </main>
    </>
  
}

export default App
