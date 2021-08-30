import React from "react";
import { Button, Form, FormControl, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className=" shadow-sm p-3 rounded">
      <div className="container">
        <Navbar expand="lg">
          <Navbar.Brand as={Link} to="/">
            Shopping
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0 ms-5"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/shop">
                Shop{" "}
              </Nav.Link>
              <Nav.Link as={Link} to="/review">
                Review{" "}
              </Nav.Link>
              <Nav.Link as={Link} to="/manage">
                Manage
              </Nav.Link>
            </Nav>
            <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button className="btn btn-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default NavBar;
