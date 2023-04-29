import {Table,Row,Col, Tab} from 'react-bootstrap'

function Tabella(props) {
    const lib = props.library;
    let films = props.libFilms;
   


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
                {films.map( f =><TabellaRow key={f.id} film={f}/>)}
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
    return <tr>
        <td>{props.film.id}</td>
        <td>{props.film.title}</td>
        <td>{props.film.fav}</td>
        <td>{props.film.date}</td>
        <td>{props.film.score}</td>
        
        </tr>
  }



  function AnswersDetails(props){

  }

  export {Tabella};