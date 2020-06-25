import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BudgetsTable from './BudgetsTable';
import ListRequest from '../components/ListRequest';
import CampaignName from '../components/CampaignName';


function pageContents(results, props) {
    return (
        <React.Fragment>
        <Row>
            <Col>
                <h1><CampaignName pk={props.pk} camp={props.camp} /></h1>
            </Col>
            <Col className="text-right">
                <Link
                    className="mt-2 mr-1 btn btn-success"
                    to={`/clients/${props.pk}/campaigns/${props.camp}/budgets/new/`}>
                    New Budget
                </Link>
            </Col>
        </Row>
        <BudgetsTable
            res={results}
            pk={props.pk}
            camp={props.camp}
        />
        </React.Fragment>
    )
}


function BudgetsPage() {
    const {pk, camp} = useParams();
    return (
        <ListRequest
            baseURL={`${process.env.BASEURL}clients/${pk}/campaigns/${camp}/budgets/`}
            successRenderer={pageContents}
            successProps={{pk: pk, camp: camp}}
        />
    )
}

export default BudgetsPage