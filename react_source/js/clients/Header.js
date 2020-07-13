import React from 'react';
import {Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Header() {
    return (
        <Row>
            <Col>
                <h1>Your clients</h1>
            </Col>
            <Col className="text-right">
                <Link className="btn btn-primary mt-2" to='/clients/select-clients/'>
                    Select your clients
                </Link>
            </Col>
        </Row>
    )
}


export default Header