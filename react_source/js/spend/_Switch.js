import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import Error404 from '../components/Error404';
import SpendPage from './SpendPage';
import UploadSpend from './UploadSpend';


function SpendSwitch () {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={SpendPage} />
            <Route exact path={`${match.path}/upload`} component={UploadSpend} />
            <Route path={match.path} component={Error404} />
        </Switch>
    )
}

export default SpendSwitch