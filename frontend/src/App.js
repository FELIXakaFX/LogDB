import './App.css';
import { ReactComponent as LogoSVG } from './logo.svg';
import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import { Nav, Navbar, Container } from 'react-bootstrap';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import EventList from './EventList';
import SearchBar from './SearchBar';
import OrderItems from './OrderItems';
import AttributeList from './AttributeList';

TimeAgo.addDefaultLocale(en)

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid="md">
            <NavLink className="navbar-brand" to="/">
          <LogoSVG/>
          &nbsp;
          LogDB
          </NavLink>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end">
          <NavLink to="/hosts" className="nav-link">Hosts</NavLink>
          <NavLink to="/senders" className="nav-link">Senders</NavLink>
          <OrderItems />
          <SearchBar />
          </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Container fluid="md">
          <Routes>
            <Route path="/host/:id" element={<EventList field="host__id"/>}/>
            <Route path="/sender/:id" element={<EventList field="sender__id" />}/>
            <Route path="/event/:id" element={<EventList field="id" />}/>
            <Route path="/hosts/" element={<AttributeList attribute="host" />}/>
            <Route path="/senders/" element={<AttributeList attribute="sender" />}/>
            <Route path="/" element={<EventList />}/>
          </Routes>
        </Container>
      </div>
    </Router>
    );
  }
  
  export default App;