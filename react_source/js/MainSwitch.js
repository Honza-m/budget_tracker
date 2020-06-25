import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Error404 from './components/Error404';
import Navigation from './components/Navigation';
import ClientSwitch from './clients/_Switch';
import CampaignSwitch from './campaigns/_Switch';
import PlatformSwitch from './platforms/_Switch';
import SpendSwitch from './spend/_Switch';
import BudgetSwitch from './budgets/_Switch';


function MainSwitch(props) {
	return (
      <div>
        <Navigation />
        <div className="container">
        <Switch>
          <Route path="/dashboard" component={ClientSwitch} />
          <Route path="/clients/:pk/campaigns/:camp/budgets" component={BudgetSwitch} />
          <Route path="/clients/:pk/campaigns" component={CampaignSwitch} />
          <Route path="/clients/:pk/platforms/:plat/spend" component={SpendSwitch} />
          <Route path="/clients/:pk/platforms" component={PlatformSwitch} />         
          <Route exact path="/"><Redirect to="/dashboard" /></Route>
          <Route path="" component={Error404} />
        </Switch>
        </div>
      </div>
	)
}


export default MainSwitch