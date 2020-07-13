import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';

import ClientName from '../components/ClientName';


function Header(){
    let {pk} = useParams();
    return (
        <Row>
            <Col sm="12" md="8">
                <h1>Platforms - <ClientName pk={pk} /></h1>
            </Col>
            <Col className="text-right">
                <Link
                    className="mt-2 mr-1 btn btn-success"
                    to={`/clients/${pk}/campaigns/platforms/new/`}>
                    Add platform
                </Link>
            </Col>
        </Row>
    )
}

export default Header