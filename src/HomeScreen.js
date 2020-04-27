import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from './user/UserContext';
import { Jumbotron } from 'react-bootstrap';
import './HomeScreen.css';

const HomeScreen = () => {
  const { user } = useContext(UserContext);

  return (
    <Jumbotron className='bg-light HomeScreen'>
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      {user.loggedIn ?
        <h3>Welcome Back</h3>
        :
        <Link to="/login" className="btn btn-primary">Login</Link>
      }
    </Jumbotron>
  );
}

export default HomeScreen;