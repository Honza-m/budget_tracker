import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import Error404 from './components/Error404';
import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';

import urls from './urls/_URLs';


function MainSwitch(props) {
	return (
    <Switch>
      {urls.map(({url, component}, i) => (
        <Route
          key={i}
          exact path={url}
          render={props => {
            const Component = component;
            return (
              <div>
                <Navigation urls={urls} />
                <div className="container">
                  <Breadcrumb className="d-sm-block d-md-none">
                    <Breadcrumbs urls={urls} type="breadcrumb"/>
                  </Breadcrumb>
                  <Component {...props} />
                </div>
              </div>
            )
          }}
        />
      ))}
      <Route exact path="/"><Redirect to="/clients/" /></Route>
      <Route path="" component={Error404} />
    </Switch>
	)
}


export default MainSwitch