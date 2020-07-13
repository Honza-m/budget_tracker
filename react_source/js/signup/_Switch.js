import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignupPage from './SignupPage';
import CheckEmail from './CheckEmail';
import OrganizationPage from './OrganizationPage';
import CreatePasswordPage from './CreatePasswordPage';
import ConfirmToken from './ConfirmToken';


function SignupSwitch(props) {
    const path = props.match.path;
    return (
        <div className="container">
        <div className="login-card">
        <Switch>
            <Route exact path={path} component={SignupPage} />
            <Route exact path={`${path}check-email/`} component={CheckEmail} />
            <Route exact path={`${path}confirm-token/:uid/:token/`} component={ConfirmToken} />
            <Route exact path={`${path}organization/`} component={OrganizationPage} />
            <Route exact path={`${path}password/`} component={CreatePasswordPage} />
        </Switch>
        </div>
        </div>
    )
}

export default SignupSwitch