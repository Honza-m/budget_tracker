import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import ClientList from './Client';
import Navigation from './Navigation';
import LogoutPage from './LogoutPage';


function MainApp(props) {
	const base = 'http://127.0.0.1:8000/api/'
	return (
      <div>
        <Navigation />
        <div className="container">
        <Switch>
          <Route path="/logout/" component={LogoutPage} />
        	<Route path="/dashboard/">
        		<ClientList base={base}/>
        	</Route>
          <Route path="/test/">
            <h1>Test</h1>
          </Route>
        </Switch>
        </div>
      </div>
	)
}


export default MainApp