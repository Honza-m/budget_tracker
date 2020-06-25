import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import 'bootstrap';

import LoginPage from './login_logout/LoginPage';
import LogoutPage from './login_logout/LogoutPage';
import MainSwitch from './MainSwitch';



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('auth')
      ? <Component {...props} />
      : <Redirect to="/login/" />
  )} />
)

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login/" component={LoginPage} />
                <Route exact path="/logout/" component={LogoutPage} />
                <PrivateRoute exact path="" component={MainSwitch}/>
            </Switch>
        </BrowserRouter>
    ); 
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);