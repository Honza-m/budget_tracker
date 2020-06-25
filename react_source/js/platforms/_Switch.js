import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import Error404 from '../components/Error404';
import PlatformsPage from './PlatformsPage';
import NewPlatform from './new_platform/NewPlatform';


function PlatformSwitch() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={PlatformsPage} />
            <Route exact path={`${match.path}/new`} component={NewPlatform} />
            <Route path={match.path} component={Error404} />
        </Switch>
    )
}

export default PlatformSwitch