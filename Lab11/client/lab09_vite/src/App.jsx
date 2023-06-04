/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 7
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';

import { React, useState } from 'react';
import { Container } from 'react-bootstrap/'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {Navigation} from './components/Navigation';
import { MainLayout, AddLayout, EditLayout, DefaultLayout, NotFoundLayout, } from './components/PageLayout';
import { useEffect } from 'react';
//import FILMS from './films'
import { listFilms,filmFilter, addFilm, updateFilm, deleteFilm } from './API';



function App() {
  /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - An URL of the corresponding route (it MUST match /filter/<filter-key>)
   * - A filter function applied before passing the films to the FilmTable component
   */
  const filters = {
    'filter-all':       { label: 'All', url: '/'},
    'filter-favorite':  { label: 'Favorites', url: '/filter/favorites'},
    'filter-best':      { label: 'Best Rated', url: '/filter/best'},
    'filter-lastmonth': { label: 'Seen Last Month', url: '/filter/seenLastMonth'},
    'filter-unseen':    { label: 'Unseen', url: '/filter/unseen'}
  };

  const isSeenLastMonth = (film) => {
    if('watchDate' in film && film.date) {  // Accessing watchDate only if defined
      const diff = film.date.diff(dayjs(),'month')
      const isLastMonth = diff <= 0 && diff > -1 ;      // last month
      return isLastMonth;
    }
}


  // This state contains the list of films (it is initialized from a predefined array).
  const [films, setFilms] = useState([]);
  const [loading,setLoading] = useState(true);
  const [dirty,setDirty] = useState(true);

  //I commented this part because the film list is yet displayed thanks to the PageLayout useEffect
  // useEffect(() => {
  //   // load the list of questions from the API server
  //   listFilms().then((list) => {
  //     console.log("App");
  //     //console.log(list);
  //     setFilms(list);
  //     setLoading(false) ;
  //   })
  // }, [loading]);

  // This state contains the last film ID (the ID is continuously incremented and never decresead).
  //const [lastFilmId, setLastFilmId] = useState(films[films.length-1].id + 1);

  // This function add the new film into the FilmLibrary database 
  const saveNewFilm = async (newFilm) =>  {
    // setFilms( (films) => [...films, {"id": lastFilmId, ...newFilm}] );
    // setLastFilmId( (id) => id + 1 );

    const newId = await addFilm(newFilm.title,newFilm.fav,newFilm.score,1,newFilm.date ? newFilm.date : "");
    console.log(`New film ${newFilm.title} added` );
    //navigate('/');   yet present in FilmForm -> handleSubmit
  }

  // This function updates a film already stored into the FilmLibrary array
  const refreshFilm = async (film) => {
    // setFilms(oldFilms => {
    //   return oldFilms.map(f => {
    //     if(film.id === f.id)
    //       return { "id": film.id, "title": film.title, "fav": film.fav, "date": film.date, "score": film.score };
    //     else
    //       return f;
    //   });
    // });
    const id = await updateFilm(film.title,film.fav,film.score,1,film.date,film.id);
    console.log(`Film ${film.title} updated` );
  }

  const delFilm = async (filmId) => {
      await deleteFilm(filmId);
      console.log(`Film ${filmId} deleted` );
  };

  return (
    <BrowserRouter>
      <Container fluid className='App'>
        <Navigation/>
        
        <Routes>
          <Route path="/" element={ <DefaultLayout films={films} filters={filters} /> } >
            <Route index element={ <MainLayout films={films} setFilms={setFilms} filters={filters} deleteFilm={delFilm} updateFilm={refreshFilm} dirty={dirty} setDirty={setDirty} /> } />
            <Route path="filter/:filterLabel" element={ <MainLayout films={films} setFilms={setFilms} filters={filters} deleteFilm={delFilm} updateFilm={refreshFilm} dirty={dirty} setDirty={setDirty} /> } />
            <Route path="add" element={ <AddLayout filters={filters}  addFilm={(film) => saveNewFilm(film)} /> } />
            <Route path="edit/:filmId" element={ <EditLayout films={films} setFilms={setFilms} filters={filters}  editFilm={refreshFilm} dirty={dirty} setDirty={setDirty} /> } />
            <Route path="*" element={<NotFoundLayout />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
