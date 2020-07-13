import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';

import ClientName from '../components/ClientName';


function Header(){
    let {pk} = useParams();
    return (
        <Row>
            <Col>
                <h1>Campaigns - <ClientName pk={pk} /></h1>
            </Col>
            <Col className="text-right">
                <Link
                    className="mt-2 mr-1 btn btn-success"
                    to={`/clients/${pk}/campaigns/new/`}>
                    New Campaign
                </Link>
                <Link
                    variant="secondary"
                    className="mt-2 btn btn-secondary"
                    to={`/clients/${pk}/campaigns/platforms/`}>
                    Spend
                </Link>
            </Col>
        </Row>
    )
}

export default Header