import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Dashboard from './dashboard/Dashboard';
import EditClients from './dashboard/edit_clients/EditClients';
import ClientDash from './client_dash/ClientDash';
import NewCampaign from './client_dash/campaigns/NewCampaign';
import ClientPlatforms from './client_dash/platforms/ClientPlatforms';
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
        	<Route exact path="/dashboard/" component={Dashboard} />
          <Route exact path="/dashboard/select-clients/" component={EditClients} />
          <Route exact path="/client/:pk/" component={ClientDash} />
          <Route exact path="/client/:pk/campaign/new/" component={NewCampaign} />
          <Route exact path="/client/:pk/platforms/" component={ClientPlatforms} />
          <Route exact path="/client/:pk/platforms/new/" component={ClientPlatforms} />
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