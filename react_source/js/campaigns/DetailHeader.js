import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import CampaignName from '../components/CampaignName';


function DetailHeader(props) {
    return (
        <Row>
            <Col>
                <h1><CampaignName pk={props.pk} camp={props.camp} /></h1>
            </Col>
            <Col className="text-right">
                <Link
                    className="mt-2 mr-1 btn btn-success"
                    to={`/clients/${props.pk}/campaigns/${props.camp}/budgets/`}>
                    Budgets
                </Link>
            </Col>
        </Row>
    )
}

export default DetailHeader