import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

import Error404 from '../components/Error404';
import BudgetsPage from './BudgetsPage';
import NewBudget from './new_budget/NewBudget';


function BudgetSwitch() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.path} component={BudgetsPage} />
            <Route exact path={`${match.path}/new`} component={NewBudget} />
            <Route path={match.path} component={Error404} />
        </Switch>
    )
}

export default BudgetSwitch