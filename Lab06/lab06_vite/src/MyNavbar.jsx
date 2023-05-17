import NavDropdown from 'react-bootstrap/NavDropdown'
import {Row,Col,Button,Container,Form,Nav,Navbar,Table} from 'react-bootstrap'
import myIcon from "./assets/book.svg"
import userIcon from "./assets/person-circle.svg"
import './MyNavbar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function VerticalMenu(props) {
  return (
    <Nav id="leftmenu" className="h-100 flex-column align-items-stretch pe-4 border-end" >
      <Nav.Item className='left-opt'>
        <Nav.Link href="#" onClick={props.allFilter}>All</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#" onClick={props.favFilter}>Favorite</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#" onClick={props.bestFilter}>Best rated</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#" onClick={props.lastMonthFilter}>Seen Last Month</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#" onClick={props.unseenFilter}>Unseen</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}


function MyNavbar(){
  return(
    <Navbar bg="primary" expand="sm" variant="dark" fixed="top" className="navbar-padding">
    <Navbar.Brand href="index.html">
        <i className="bi bi-collection-play icon-size"/> Film Library
    </Navbar.Brand>
    <Form className="my-2 my-lg-0 mx-auto d-sm-block" action="#" role="search" aria-label="Quick search">
        <Form.Control className="mr-sm-2" type="search" placeholder="Search" aria-label="Search query" />
    </Form>
    <Nav className="ml-md-auto">
    <Nav.Item>
        <Nav.Link href="#">
        <i className="bi bi-person-circle icon-size"/>
        </Nav.Link>
    </Nav.Item>
    </Nav>
</Navbar>
  );
}


export {VerticalMenu,MyNavbar};