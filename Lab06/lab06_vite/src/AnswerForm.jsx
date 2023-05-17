import dayjs from 'dayjs';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

function AddOrEditForm(props) {

    //hooks to manage the answer's date,text and author states
    //remember to initialize the default value inside hooks or this will be defined and the object will consider as UNCONTROLLED
    //(in contrapposition to CONTROLLED REACT OBJECTS )

    //we initialized the form with a initialValue passed by the parent thorugh props
    //this allow us to save uncommitted changes inside the interface
   
   //conditional initialization to take info from the yet present answer in case we would edit them
   //so the edit interface will filled by the actual info 
    const [date, setDate] = useState(() => {
        //I dont't know if this structure is kind of legal...
        if (props.mode==='edit') {
            if (props.initialValue.date!==undefined)
                return props.initialValue.date.format('YYYY-MM-DD')
            else return undefined 
        }else 
            return dayjs().format('YYYY-MM-DD')}) ;

    const [id, setId] = useState(
            props.mode==='edit' ? props.initialValue.id: '') ;
    const [title, setTitle] = useState(
        props.mode==='edit' ? props.initialValue.title : '') ;
    const [fav, setFav] = useState(
        props.mode==='edit' ? props.initialValue.fav :'') ;
    const [score, setScore] = useState(
        props.mode==='edit' ? props.initialValue.score :'') ;

    //here an error managing too using hooks
    const [err, setErr] = useState('')

    //the AnswerForm handleAdd is different from handleAdd specificed in Components by the parent QuestionWithAnswer
    //and passed as AnswerForm props

    //here the functions are used to validate data or to throw errors
    function handleAdd() {
        
        if(title!=='' && score> 0 && score <=5) {
            if (date==""){
                //setDate(undefined);
                props.handleAdd(title, fav, score, undefined);
            }else{
                props.handleAdd(title, fav, score, date);
            }
        } else {
            //look at how errors are managed using hooks so we have to adopt setErr to set err=errValue
            setErr('Some data are missing') ;
        }
    }

    function handleSave() {
        if(title!=='' && score> 0 && score <=5) {
            if (date==""){
                //setDate(undefined);
                props.handleSave(id,title, fav, score, undefined);
            }else{
                props.handleSave(id,title, fav, score, date);
            }
        } else {
            setErr('Some data are missing') ;
        }
    }

    return <div>
        {/*the error message appears only in case of errors */}
        {err && <p>{err}</p>}

            <Form.Group controlId="filmTitle">
            <Form.Label className='fw-light'>Title</Form.Label>
            <Form.Control value={title} onChange={(ev)=>{setTitle(ev.target.value)}} type="text" name="title" placeholder="Enter title" />
        </Form.Group>

        <Form.Group controlId="filmScore">
            <Form.Label className='fw-light'>Score</Form.Label>
            <Form.Control value={score} onChange={(ev)=>{setScore(ev.target.value)}} type="text" name="score" placeholder="Enter score" />
        </Form.Group>

        <Form.Group controlId="filmDate">
            <Form.Label className='fw-light'>Date</Form.Label>
            <Form.Control value={date} onChange={(ev)=>{setDate(ev.target.value)}}type="date" name="date" placeholder="Enter Watch Data" />
        </Form.Group>

        <Form.Group controlId="addButton">
            <Form.Label className='fw-light'>&nbsp;</Form.Label><br />
            {/*only in edd add and edit mode the tow buttonw will show up */}
            {props.mode==='add' && <Button className="bi bi-plus-circle-fill" variant='success' id="addbutton" onClick={handleAdd}></Button>}
            {props.mode==='edit' && <Button variant='success' id="addbutton" onClick={handleSave}>SAVE</Button>}
            {/**but the cancel button will be present anyway */}
            {' '}<Button variant='secondary' id="addbutton" onClick={props.handleCancel}>CANCEL</Button>
        </Form.Group>
    </div>
}

export {AddOrEditForm}


