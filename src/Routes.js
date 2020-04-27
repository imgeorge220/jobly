import React from 'react';
import { Switch, Route} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import HomeScreen from "./HomeScreen";
import LoginForm from "./user/LoginForm";
import ProfileForm from "./user/ProfileForm";
import CompanyList from "./company/CompanyList";
import JobList from "./job/JobList";
import Company from "./company/Company";
import NotFound from './NotFound';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/login" component={LoginForm} />
        <PrivateRoute exact path="/profile" component={ProfileForm} />
        <PrivateRoute exact path="/companies" component={CompanyList} />
        <PrivateRoute exact path="/companies/:handle" component={Company} />
        <PrivateRoute exact path="/jobs" component={JobList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Routes;
