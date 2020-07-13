import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import SignupRequest from './SignupRequest';


function CreatePasswordForm(props) {
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
        <h1 className="text-center">Create password for your account</h1>
        <Row>
        <Col lg="3"></Col>
        <Col>
        <Form onSubmit={props.submitForm}>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    {...props.fields.password1}
                />
                <Form.Control.Feedback type="invalid">
                  {props.fields.password1.isInvalid}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                    type="password"
                    {...props.fields.password2}
                />
                <Form.Control.Feedback type="invalid">
                  {props.fields.password2.isInvalid}
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


function CreatePasswordPage() {
    return (
        <SignupRequest
            url={`${process.env.BASEURL}users/signup/password/`}
            redirect={'/login/'}
            fields={{'password1': '', 'password2': ''}}
            form={CreatePasswordForm}
            type="POST"
        />
    )
}

export default CreatePasswordPage