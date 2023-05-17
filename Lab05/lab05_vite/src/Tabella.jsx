import {Table,Row,Col, Tab,Form,Button} from 'react-bootstrap'
import { useState } from "react";

function Tabella(props) {
    const lib = props.library;
    const films = props.films;
   


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
                {films.map( f =>  <TabellaRow key={f.id} film={f} changeFav={props.changeFav}/>)}
            </tbody>
            <tfoot>
               
            </tfoot>
        </Table>
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
    if (props.film.date != undefined){
    return (
        <tr>
        <td>{props.film.id}</td>
        <td>{props.film.title}</td>
        <td><Form.Check aria-label="option 1" checked={checked}  onChange={handleCheck}></Form.Check></td>
        <td>{props.film.date.format('DD/MM/YYYY') }</td>
        <td>{props.film.score}</td>
        
        </tr>
    )
    }else{
        return (
            <tr>
            <td>{props.film.id}</td>
            <td>{props.film.title}</td>
            <td><Form.Check aria-label="option 1" checked={checked}  onChange={handleCheck}></Form.Check></td>
            <td>UNDEFINED </td>
            <td>{props.film.score}</td>
            
            </tr>
        )
    }
  }

  export {Tabella};