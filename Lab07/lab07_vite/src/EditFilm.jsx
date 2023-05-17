import { useNavigate, useParams } from "react-router-dom";
import { AddOrEditForm } from "./AnswerForm";


function EditFilm(props) {
    //navigate is useful to jumpt straight to a specific path
    const navigator = useNavigate() ;
    const { idFilm } = useParams() ;

    const handleCancel = () => {
        //this is the way to create a path using mutable parameters
        navigator(`/`)
    }

    const handleSave = (id, date, text, author) => {
        props.editFilm(id, date, text, author, idFilm);
        navigator(`/`)
    }

    const editedFilm = props.films.filter((a)=>(a.id == idFilm))[0] ;

    return <AddOrEditForm mode='edit' handleCancel={handleCancel} handleSave={handleSave} initialValue={editedFilm}/>

}

export { EditFilm };