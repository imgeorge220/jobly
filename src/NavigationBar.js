import React, { useContext } from 'react';
import UserContext from './user/UserContext';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <Navbar className='NavigationBar'>
      <Navbar.Brand>
        <NavLink className="nav-link" to='/'>Jobly</NavLink>
      </Navbar.Brand>
      {user.loggedIn ?
        <Nav className="ml-auto">
          <NavLink className="nav-link" to='/companies'>Companies</NavLink>
          <NavLink className="nav-link" to='/jobs'>Jobs</NavLink>
          <NavLink className="nav-link" to='/profile'>Profile</NavLink>
          <NavLink className="nav-link" to='/login' onClick={logout}>Logout</NavLink>
        </Nav>
        :
        <Nav className="ml-auto">
            <NavLink className="nav-link" to='/login'>Login</NavLink>
        </Nav>
      }
    </Navbar>
  );
}

export default NavigationBar;
