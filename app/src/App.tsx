import React, {useState} from 'react';
import Signup from './routes/auth/signup';
import Map from './routes/map/map'
import {Nav, Navbar, Button} from 'react-bootstrap';
import Edit from './routes/edit/edit';
import SignIn from './routes/auth/signIn'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Account from './routes/account/account';

// App is broken down into 4 main components Auth, Account, Edit, and Map. All Components share the user and company through session storage.

const App = ():JSX.Element => {

    const authorized = ():boolean => {
      const token = window.sessionStorage.getItem('token');
      if(!token) {
        return false;
      } else {
        return true;
      } 
    }

    const logOut = ():void => {
      window.sessionStorage.clear();
      window.location.href = "/login";
    }

    const image = window.sessionStorage.getItem('userPicture');
  
  return (
    <Router>
      <Navbar bg="white" expand="lg" className="nav nav-custom">
        <Navbar.Brand className="nav-header" style={{color:'#333333'}}>Store Locator Plugin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-link">
            <Link to="/account" className="nav-text">Manage Account</Link>
          </Nav>
          <Nav className="nav-link">
            <Link to="/edit" className="nav-text">Edit Location</Link>
          </Nav>
          <Nav className="nav-link">
            <Link to="/map" className="nav-text">Generate Map</Link>
          </Nav>
        </Navbar.Collapse>
        {authorized() ? 
          <Navbar.Collapse className="justify-content-end">
            <Nav> {image ? <img alt="user" className="user-image" src={image}></img> : <i className='far fa-user-circle generic-image'></i>} </Nav>
            <Nav>
              <Button onClick={() => logOut()}>Log Out</Button>
            </Nav>
          </Navbar.Collapse>
        : null}
      </Navbar>
      <Switch>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/login">
            <SignIn/>
          </Route>
          <Route path="/edit">
            {authorized() ? <Edit/> : <Redirect to="/login"/>}
          </Route>
          <Route path="/map">
            {authorized() ? <Map/> : <Redirect to="/login"/>}
          </Route>
          <Route path="/account">
            {authorized() ? <Account/> : <Redirect to="/login"/>}
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
