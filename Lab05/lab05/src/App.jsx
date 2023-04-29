import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from 'react-bootstrap';
import { useState } from "react";
import {Film,FilmLibrary} from "./lab01"

function App() {

  return <>
  <header>
      <Navbar sticky="top" variant='dark' bg="primary" expand="lg" className='mb-3'>
        <Container>
          <Navbar.Brand>HeapOverrun - Question 1</Navbar.Brand>
          <Navbar.Text>
            Signed in as: Tom
          </Navbar.Text>
        </Container>
      </Navbar>
    </header>
    <main>
      <Container>
        
      </Container>
    </main>
  </>
   
  
}

export default App
