import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import SignupRequest from './SignupRequest';


function OrganizationForm(props) {
    if (props.nonFieldErrors) {
        var nonfielderrors = (
            <Alert variant="danger">
                {props.nonFieldErrors}
            </Alert>
        )    
    } else {
        var nonfielderrors = ""
    }
    return (
        <div>
        {nonfielderrors}
        <h1 className="text-center">Name of your organization</h1>
        <Row>
        <Col lg="3"></Col>
        <Col>
        <Form onSubmit={props.submitForm}>
         <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    {...props.fields.name}
                />
                <Form.Control.Feedback type="invalid">
                  {props.fields.name.isInvalid}
                </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={props.loading ? null : props.submitForm}>
                {props.loading ? "Loading..." : "Continue"}
            </Button>
        </Form>
        </Col>
        <Col lg="3"></Col>
        </Row>
        </div>
    )
}


function OrganizationPage() {
    return (
        <SignupRequest
            url={`${process.env.BASEURL}users/signup/organization/`}
            redirect={'/signup/password/'}
            fields={{'name': ''}}
            type="PATCH"
            form={OrganizationForm}
        />
    )
}

export default OrganizationPage