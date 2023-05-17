import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AddOrEditForm } from "./AnswerForm";

function AddFilm(props) {

    const navigator = useNavigate() ;

    const handleCancel = () => {
        navigator('/');
    }

    const handleAdd = (title, fav, score, date) => {
        props.addFilm(title, fav, score, date) ;
        navigator('/');
    }

    return <div>
        <p>ADD A NEW FILM</p>
        <AddOrEditForm mode='add' handleCancel={handleCancel} handleAdd={handleAdd}/>
    </div>

}

export {AddFilm} ;