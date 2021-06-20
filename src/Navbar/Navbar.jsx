import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';

const Navigation = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">The Sparks Bank</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create-new">Create Customer</Nav.Link>
            <Nav.Link href="/customers">Customers</Nav.Link>
            <Nav.Link href="/transfers">Transfer History</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}
 
export default Navigation;