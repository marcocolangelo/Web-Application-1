import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Container,Col} from 'react-bootstrap';
import {Tabella} from './Tabella';
import { useState } from "react";
import {MyNavbar,VerticalMenu} from './MyNavbar';
import {Film,FilmLibrary} from "./lab01.js"
import { BrowserRouter, Link, Outlet, Route, Routes, useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {PageNotFound} from "./PageNotFound";
import { AddFilm } from './AddFilm';
import { EditFilm } from './EditFilm';

import FilterContext from './FiltroContext';
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
 

  const changeFav = (id) => {
    
    
    mylibrary.films = mylibrary.films.map((ans) => 
            ans.id === id ? new Film(ans.id, ans.title, !ans.fav, ans.score, ans.date) : ans);

    setLib(mylibrary);
    setFilms(mylibrary.films);
  }
//verifica un po le routes. A me non convince quel Route index e il path=/filter
  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout filter={filter} setFilter={setFilter} films={films} setFilms={setFilms}/>}>
        <Route index element={<Tabella id="tabella" films={films} filter={filter} changeFav={changeFav} addFilm={addFilm} editFilm={editFilm} deleteFilm={deleteFilm}></Tabella>} />
        <Route path='/:filter'
          element={<Tabella id="tabella" films={films} filter={filter} changeFav={changeFav} addFilm={addFilm} editFilm={editFilm} deleteFilm={deleteFilm}></Tabella>} />    
        <Route path='/addFilm'
          element={<AddFilm addFilm={addFilm}/>} />
        <Route path='/editFilm/:idFilm'
          element={<EditFilm editFilm={editFilm} films={films}/>}/>
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>;
 
  
}

//verifica se è okay l'uso di useNavigate qui e soprattutto navigate(/filter)

function MainLayout(props){
  const films = props.films;
  const setFilms = props.setFilms;
  const filter = props.filter;
  const setFilter = props.setFilter;
  const {filt} = useParams();
  const navigate = useNavigate();

  const showFav = () => {
    //setFilms(() => mylibrary.films.filter(f => f.fav));
    setFilter('Favourites');
    navigate('/favorites');
  };

  const showBest = () => {
    //setFilms(() => mylibrary.films.filter((a) => a.score == 5));
    setFilter('Best Films');
    navigate('/best_films');
  };

  const showLastMonth = () => {
    //setFilms( () =>mylibrary.films.filter((a) => a.date != undefined && dayjs().diff(a.date,'days') <= 30 ));
    setFilter('Seen last month');
    navigate('/seen_last_month');
  }

  const showAll = () => {
    //setFilms( mylibrary.films);
    setFilter('All');
    navigate('/');
  }

  const showUnseen = () =>{
    
    //setFilms(() => mylibrary.films.filter((f) => f.date == undefined));
    setFilter('Undefined')
    navigate('/unseen');
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
            <FilterContext.Provider value={films}>
              <Outlet/>
            </FilterContext.Provider> 
          </Col>
        
      </Container>
    
  </Container>
    </>
  
}

export default App
