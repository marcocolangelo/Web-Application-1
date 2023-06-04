import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link, useParams, useLocation, Outlet } from 'react-router-dom';
import FilmForm from './FilmForm';
import FilmTable from './FilmLibrary';
import { RouteFilters } from './Filters';
import { addFilm,filmFilter,updateFilm } from '../API';


function DefaultLayout(props) {
  const location = useLocation();

  const { filterLabel } = useParams();
  const filterId = filterLabel || (location.pathname === "/" && 'filter-all');
  
  return (
    <Row className="vh-100">
      <Col md={4} xl={3} bg="light" className="below-nav" id="left-sidebar">
        <RouteFilters items={props.filters} selected={filterId} />
      </Col>
      <Col md={8} xl={9} className="below-nav">
        <Outlet/>
      </Col>
    </Row>
  );
}

function MainLayout(props) {

  const filters = {
    'all':       { label: 'All', url: '/'},
    'favorites':  { label: 'Favorites', url: '/filter/favorites'},
    'best':      { label: 'Best Rated', url: '/filter/best'},
    'seenLastMonth': { label: 'Seen Last Month', url: '/filter/seenLastMonth'},
    'unseen':    { label: 'Unseen', url: '/filter/unseen'}
  };


  const { filterLabel } = useParams();
  let filterName = filterLabel != undefined? filters[filterLabel].label:'All';
 // const [filteredFilms,setFilteredFilms] = useState([]);
  const [loading,setLoading] = useState(true);
  

    const dirty = props.dirty;
    const setDirty = props.setDirty;


    useEffect(() => {
      setDirty(true);
    }, [filterLabel])

    useEffect(() => {
      if (dirty) {
        filmFilter(filterLabel)
          .then(films => {
            props.setFilms(films);
            setDirty(false);
          })
          .catch(e => { console.log(e); } ); 
      }
  },[filterLabel, dirty]);
 
  
  const location = useLocation();
  // When an unpredicted filter is written, all the films are displayed.
  const filteredFilms = props.films;
  
  return (
    <>
      <h1 className="pb-3">Filter: <span className="notbold">{filterName}</span></h1>
      <FilmTable films={filteredFilms}
        deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} dirty={dirty} setDirty={setDirty} />
      <Link className="btn btn-primary btn-lg fixed-right-bottom" to="/add" state={{nextpage: location.pathname}}> &#43; </Link>
    </>
  )
}

function AddLayout(props) {
  // add a film into the list
  const insertFilm = (film) => {
    addFilm(film.title,film.fav,film.score,film.user,film.date)
      .catch(e => console.log(e)); 
  }
  return(
    <FilmForm addFilm={insertFilm}/>
  );
}

function EditLayout(props) {
  const setDirty = props.setDirty;
  const navigate = useNavigate();
  const { filmId } = useParams();

//problema : se carichi la pagina senza passare per la lista completa di film non ti trova il film

  const thisFilm = props.films && props.films.find( f => f.id === Number(filmId) );
  
  if(thisFilm == null){
    console.log(`Film not found because of id ${filmId}`);
    navigate("/add");
  }else
    console.log(`Film found : ${thisFilm.title}`)

    const editFilm = (film) => {
      updateFilm(film.title,film.fav,film.score,film.user,film.date,film.id)
        .then(() => { setDirty(true); })
        .catch(e => console.log(e)); 
    }

  return(
    <FilmForm film={thisFilm} editFilm={editFilm}/>
  );
}

function NotFoundLayout() {
    return(
        <>
          <h2>This is not the route you are looking for!</h2>
          <Link to="/">
            <Button variant="primary">Go Home!</Button>
          </Link>
        </>
    );
  }


export { DefaultLayout, AddLayout, EditLayout, NotFoundLayout, MainLayout }; 
