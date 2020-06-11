import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Dashboard from './dashboard/Dashboard';
import EditClients from './dashboard/edit_clients/EditClients';
import Navigation from './main_components/Navigation';
import LogoutPage from './main_components/LogoutPage';


function MainApp(props) {
	const base = 'http://127.0.0.1:8000/api/'
	return (
      <div>
        <Navigation />
        <div className="container">
        <Switch>
          <Route exact path="/logout/" component={LogoutPage} />
        	<Route exact path="/dashboard/">
        		<Dashboard base={base}/>
        	</Route>
          <Route exact path="/dashboard/select-clients/">
            <EditClients base={base}/>
          </Route>
          <Route exact path="/test/">
            <h1>Test</h1>
          </Route>
          /* Redirect to dashboard if no url*/
          <Route path="/">
            <Redirect to="/dashboard/" />
          </Route>
        </Switch>
        </div>
      </div>
	)
}


export default MainApp