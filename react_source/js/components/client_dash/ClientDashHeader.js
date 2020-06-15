import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Header(props){
    return (
        <Row>
            <Col>
                <h1>Client {props.clientPK}</h1>
            </Col>
            <Col className="text-right">
                <Link
                    className="mt-2 mr-1 btn btn-success"
                    to={`/client/${props.clientPK}/campaign/new/`}>
                    New Campaign
                </Link>
                <Link
                    variant="secondary"
                    className="mt-2 btn btn-secondary"
                    to={`/client/${props.clientPK}/platforms/`}>
                    Spend
                </Link>
            </Col>
        </Row>

    )
}

export default Header