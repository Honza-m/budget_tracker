import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import Error404 from '../components/Error404';
import ClientsPage from './ClientsPage';
import EditClients from './edit_clients/EditClients';


function ClientSwitch() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={ClientsPage} />
            <Route exact path={`${match.path}/select-clients`} component={EditClients} />
            <Route path={match.path} component={Error404} />
        </Switch>
    )
}

export default ClientSwitch