import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import Error404 from '../components/Error404';
import CampaignsPage from './CampaignsPage';
import CampaignDetail from './CampaignDetail';
import NewCampaign from './new_campaign/NewCampaign';

function CampaignSwitch() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={CampaignsPage} />
            <Route exact path={`${match.path}/new`} component={NewCampaign} />
            <Route exact path={`${match.path}/:camp`} component={CampaignDetail} />
            <Route path={match.path} component={Error404} />
        </Switch>
    )
}

export default CampaignSwitch