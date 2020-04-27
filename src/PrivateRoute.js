import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import UserContext from './user/UserContext';

const PrivateRoute = ({ component, ...childProps }) => {
  const { user } = useContext(UserContext);
  const finalComponent = user.loggedIn ?
    <Route {...childProps} component={component} />
    :
    <Redirect to='/login' />

  return (
    finalComponent
  );
}

export default PrivateRoute;