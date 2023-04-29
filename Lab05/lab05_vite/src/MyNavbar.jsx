import NavDropdown from 'react-bootstrap/NavDropdown'
import {Row,Col,Button,Container,Form,Nav,Navbar,Table} from 'react-bootstrap'
import myIcon from "./assets/book.svg"
import userIcon from "./assets/person-circle.svg"
import './MyNavbar.css'
import {CNavItem,CNavTitle, CSidebarNav,CSidebar,CSidebarBrand,CSidebarFooter,CBadge,CNavGroup,CSidebarToggler  } from '@coreui/react'

function VerticalMenu() {
  return (
    <Nav id="leftmenu" className="h-100 flex-column align-items-stretch pe-4 border-end" >
      <Nav.Item className='left-opt'>
        <Nav.Link href="#">All</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#">Favorite</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#">Best rated</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#">Seen Last Month</Nav.Link>
      </Nav.Item>
      <Nav.Item className='left-opt'>
        <Nav.Link href="#">Unseen</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
/* 
function SideBar(){
  return <>
    <CSidebar>
      
  <CSidebarBrand>Sidebar Brand</CSidebarBrand>
  <CSidebarNav>
    <CNavTitle>Nav Title</CNavTitle>
    <CNavItem href="#">
      Nav item
    </CNavItem>
    <CNavItem href="#">
      With badge
      <CBadge color="primary ms-auto">NEW</CBadge>
    </CNavItem>
    <CNavGroup toggler="Nav dropdown">
      <CNavItem href="#">
        Nav dropdown item
      </CNavItem>
      <CNavItem href="#">
        Nav dropdown item
      </CNavItem>
    </CNavGroup>
  </CSidebarNav>
 
</CSidebar>
  
  </>
}
*/

function MyNavbar(){
  return(
  <Navbar sticky="top" variant='dark' bg="info"  className='mb-0'>
    
    <Container id="navbarcont">
         
            <Col id ="colbook">
              <img
              color='white'
              src={myIcon}
              left = '0'
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="My Icon"
              />
            </Col>
            <Col id="filmlib">
              <Navbar.Brand href="#">
                FilmLibrary
              </Navbar.Brand>
            </Col>
            
            <Col id="search-col" xs={5} md={5}>
            <Form className="d-flex">
                <Form.Control
                  
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
            
              </Form>
            </Col>

            <Col id="emptycol">{''}</Col>
          
            <Col id="usercol" >
            <img

              src={userIcon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="My Icon"
              />
            </Col>
           
            
    </Container>
    </Navbar>
  );
}


export {VerticalMenu,MyNavbar};