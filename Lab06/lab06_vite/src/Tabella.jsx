import {Table,Row,Col, Tab,Form,Button} from 'react-bootstrap'
import { useState } from "react";
import { AddOrEditForm } from './AnswerForm';
import dayjs from 'dayjs';

function Tabella(props) {
    const lib = props.library;
    const films = props.films;
   
    const [mode,setMode] = useState('view');
    const [editedFilm, setEditedFilm] = useState(false);

    //you can find all the handle functions below to manage the state changing
    //and they are linked to those ones coming from App.jsx which emulate qa.js functionalities
    //like addAnswer, editAnswer and so more
    
    //this one goes to the AddOrEdit
    function handleCancel() {
        setMode('view');
    }

    //this one must be used in AddOrEdit
    function handleAdd(title, fav, score, date) {
        props.addFilm(title, fav, score, date);
        setMode('view');
    }

    function handleAddMode(){
        console.log(mode);
        setMode('add');
    }

    //this one is used inside AddOrEdit 
    function handleSave(id, title, fav, score, date) {
        props.editFilm(id,title, fav, score, date);
        setMode('view');
    }

    //this one goes to the TabellaRow
    function handleEdit(id) {
        setEditedFilm(props.films.filter((a) => (a.id === id))[0])
        setMode('edit');
        console.log(editedFilm);
    }

    if (films){
        return <>
        <h2>{props.filter} :</h2>
        <Table hover>
            <thead >
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Favourite</th>
                    <th scope="col">Date</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                {films.map( f =>  <TabellaRow key={f.id} film={f} changeFav={props.changeFav} mode={mode} handleAddMode={handleAddMode} deleteFilm={props.deleteFilm} handleEdit={handleEdit}/>)}
            </tbody>
            <tfoot>
                
            </tfoot>
        </Table>
        {mode === 'view' && <Button className="bi bi-plus-circle-fill" variant='success' onClick={() => setMode('add')}></Button>}
        {mode=="add" && <AddOrEditForm mode={mode} handleCancel={handleCancel} handleAdd={handleAdd}/>}
        {mode=="edit" && <AddOrEditForm mode={mode} handleCancel={handleCancel} handleSave={handleSave} initialValue={editedFilm}/>}
      </>
    }else{
        return <>
            <h2>FILM LIBRARY UNREACHABLE</h2>
        </>
    }

    
  }

  function TabellaRow(props){
    const [checked,setChecked] = useState(props.film.fav);

    const handleCheck = (event) => {
        
        setChecked(event.target.checked);
        props.changeFav(props.film.id);
        
    };

    //how could I summarize this if-else in a single condition? 
    
        return (
            <tr>
            <td>{props.film.id}</td>
            <td>{props.film.title}</td>
            <td><Form.Check aria-label="option 1" checked={checked}  onChange={handleCheck}></Form.Check></td>
            <td>{props.film.date !== undefined ? props.film.date.format('DD/MM/YYYY') : ""}</td>
            <td>{props.film.score}</td>
            
            <td>{props.mode === 'view' && <Button className ="bi bi-pencil-fill" onClick={() => props.handleEdit(props.film.id)}></Button>}</td>
            <td>{props.mode === 'view' && <Button className="bi bi-trash3-fill" variant='warning' onClick={() => { props.deleteFilm(props.film.id) }}></Button>}</td>
            </tr>
    )
   
  }

  export {Tabella};