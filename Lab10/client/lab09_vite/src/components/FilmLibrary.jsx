import 'dayjs';

import { Table, Form, Button } from 'react-bootstrap/'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';

function FilmTable(props) {
  const filteredFilms = props.films;

  // This state is used for displaying the form
  const [showForm, setShowForm] = useState(false);

  // This state stores the current film when an *edit* button is pressed.
  const [editableFilm, setEditableFilm] = useState();
  return (
    <Table striped>
      <tbody>
        { filteredFilms.map((film) => <FilmRow key={film.id} filmData={film}
          deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} dirty={props.dirty} setDirty={props.setDirty}/>) }
      </tbody>
    </Table>
  );
}
  
function FilmRow(props) {
  const dirty = props.dirty;
  const setDirty = props.setDirty;
  
  const formatWatchDate = (dayJsDate, format) => {
    if (dayjs(dayJsDate).isValid()){
      return dayjs(dayJsDate).format(format);
    }else{
      return "";
    }
  }

  // location is used to pass state to the edit (or add) view so that we may be able to come back to the last filter view
  const location = useLocation();

  const handleCheckBox = (event) => {
    props.updateFilm({ ...props.filmData, "fav": event.target.checked });
    setDirty(true);
  };

  const handleRating = (newRating) =>{
     props.updateFilm({ ...props.filmData, score: newRating })
     setDirty(true);
  }

  function handleClick(event) {
    if (dirty) {
      event.preventDefault();
    }
  }

  const handleDel = (filmId) => {
    props.deleteFilm(props.filmData.id);
    setDirty(true);
  }

  return(
    <tr>
      <td>
        <Link to={"/edit/" + props.filmData.id} onClick={handleClick} state={{nextpage: location.pathname}}>
        <Button disabled={dirty} className="btn btn-primary" >
          <i className="bi bi-pencil-square"/>
        </Button>
        </Link>
        
        &nbsp;
        <Button variant='danger' disabled={dirty} onClick={() => handleDel(props.filmData.id)}>
          <i className="bi bi-trash"/>
        </Button>
      </td>
      <td>
        <p className={props.filmData.fav ? "favorite" : ""} >
          {props.filmData.title}
        </p>
      </td>
      <td>
        <Form.Check type="checkbox" label="Favorite" disabled={dirty} checked={props.filmData.fav ? true : false}
          onChange={(event) => handleCheckBox(event)} />
      </td>
      <td>
        <small>{formatWatchDate(props.filmData.date, 'MMMM D, YYYY')}</small>
      </td>
      <td>
        <Rating rating={props.filmData.score} disabled={dirty}  maxStars={5} updateRating={(newRating) => handleRating(newRating)}/>
      </td>
    </tr>
  );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={() => props.updateRating(index+1)}/>
  )
}

export default FilmTable;
