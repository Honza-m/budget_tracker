import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoginPage from './components/LoginPage';
import MainApp from './components/App';


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
                <Route path="/login/" component={LoginPage} />
                <PrivateRoute path="/" component={MainApp}/>
            </Switch>
        </BrowserRouter>
    ); 
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);