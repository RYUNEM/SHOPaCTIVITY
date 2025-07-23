import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

export default function DashboardLayout() {
  return (
    <Container fluid>
      {/* Top Navbar with Search Bar */}
      <Navbar bg="light" expand="lg" className="px-4 border-bottom">
        <Navbar.Brand>Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-search" />
        <Navbar.Collapse id="navbar-search">
          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search products"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      {/* Body layout: Sidebar + Content */}
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-light vh-100 border-end pt-3">
          <Nav className="flex-column">
            <NavLink to="dash-home" className="nav-link">Home</NavLink>
            <NavLink to="stats" className="nav-link">Stats</NavLink>
            <NavLink to="settings" className="nav-link">Settings</NavLink>
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col md={10} className="p-4">
          <Row>
            <Col>
              <h1>Middle content</h1>
              {/* You can put middle content or metrics here */}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
