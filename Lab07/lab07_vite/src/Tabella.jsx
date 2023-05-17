import {Table,Row,Col, Tab,Form,Button,Alert} from 'react-bootstrap'
import { useContext, useState } from "react";
import { AddOrEditForm } from './AnswerForm';
import dayjs from 'dayjs';
import { useNavigate, useParams ,Link} from 'react-router-dom';
import FilterContext from './FiltroContext';

//devi cambiare prospettiva ora che ogni filtro ha la sua pagina
//non bisogna più usare films e setFilms per mettere in comune la stessa variabile tra tutte le pagine con la necessità dunque di una funzione
//che faccia da filtro alla pagina padre di tutte

//ora ogni filtro ha una pagina più o meno indipendente dalle altre: usa films come base e poi ogni pagina afflica effettivamente il suo filtro, senza
//richiamare funzioni dalla pagina principale All (altrimenti il rischio è un re-rendering in loop della pagina)

function Tabella(props) {
    const lib = props.library;
    let myfilms = useContext(FilterContext);
    let pageTitle = "All";
    let {filter} = useParams();
    const navigator = useNavigate();
    //non usare più una wrapper che contenga riferimenti a tutte le funzioni filtro, il filtro deve essere ora implementato nella pagina della Tabella
    //se usi setFilms ci sarà un re-rendering infinito
    //questo perchè per rendere l'URI ESPLICATIVO (ovvero anche solo l'url deve permetterci di ri-costruire la pagina con il filtro applicato)
    //è necessario mettere una verifica e applicazione del filtro all'inizio del source code di Tabella, che in base al filtro a sua volta chiamerebbe la funzione setFilms adeguata
    //questo però porterebbe ad un altro re-rendering e quindi ad un'altra chiamata dello switch in Tabella = loop 

    //const filters = useContext(FilterContext);

    const [mode,setMode] = useState('view');
    const [editedFilm, setEditedFilm] = useState(false);


   if (filter == undefined){
        filter = "all"
   }

    switch (filter) {
        case "all":
            pageTitle = "All";
            myfilms = props.films;
            break;
        case "favorites":
            pageTitle = "Favorites";
            myfilms = props.films.filter(f => f.fav);
            break;
        case "best_films":
            pageTitle = "Best Films";
            myfilms =props.films.filter((a) => a.score == 5);
            break;
        case "unseen":
            pageTitle = "Unseen";
            myfilms = props.films.filter((f) => f.date == undefined);
            break;
        case "seen_last_month":
            pageTitle = "Seen Last Month";
            myfilms = props.films.filter((a) => a.date != undefined && dayjs().diff(a.date,'days') <= 30 );
            break;
        default:
            return <Alert variant='danger'>
                <h1>Page not found...</h1>
                <p><Link to='/'>Please go back to the home page</Link></p>
                     </Alert>
            }

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
        navigator('/addFilm');
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
        navigator(`/editFilm/${id}`);
    }

    if (myfilms){
        return <>
        <h2>{pageTitle} :</h2>
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
                {myfilms.map( f =>  <TabellaRow key={f.id} film={f} changeFav={props.changeFav} mode={mode} handleAddMode={handleAddMode} deleteFilm={props.deleteFilm} handleEdit={handleEdit}/>)}
            </tbody>
            <tfoot>
                
            </tfoot>
        </Table>
        {mode === 'view' && <Button className="bi bi-plus-circle-fill" variant='success' onClick={handleAddMode}></Button>}
        {/*{mode=="add" && <AddOrEditForm mode={mode} handleCancel={handleCancel} handleAdd={handleAdd}/>}*/}
        {/*{mode=="edit" && <AddOrEditForm mode={mode} handleCancel={handleCancel} handleSave={handleSave} initialValue={editedFilm}/>}*/}
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

    
    
        return (
            <tr>
            <td>{props.film.id}</td>
            <td style={{color: props.film.fav ? 'red' : 'black'}}>{props.film.title}</td>
            <td><Form.Check aria-label="option 1" checked={checked}  onChange={handleCheck}></Form.Check></td>
            <td>{props.film.date !== undefined ? props.film.date.format('DD/MM/YYYY') : ""}</td>
            <td>{props.film.score}</td>
            
            <td>{props.mode === 'view' && <Button className ="bi bi-pencil-fill" onClick={() => props.handleEdit(props.film.id)}></Button>}</td>
            <td>{props.mode === 'view' && <Button className="bi bi-trash3-fill" variant='warning' onClick={() => { props.deleteFilm(props.film.id) }}></Button>}</td>
            </tr>
    )
   
  }

  export {Tabella};