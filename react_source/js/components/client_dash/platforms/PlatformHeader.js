import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Header(props){
    return (
        <Row>
            <Col sm="12" md="8">
                <h1>Platforms - {props.name}</h1>
            </Col>
            <Col className="text-right">
                <Link
                    className="mt-2 mr-1 btn btn-success"
                    to={`/client/${props.clientPK}/platforms/new/`}>
                    Add platform
                </Link>
            </Col>
        </Row>

    )
}

export default Header