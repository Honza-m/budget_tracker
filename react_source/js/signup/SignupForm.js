import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SignupForm(props) {
    if (props.nonFieldErrors) {
        var nonfielderrors = (
            <Alert variant="danger">
                {props.nonFieldErrors}
            </Alert>
        )    
    } else {
        var nonfielderrors = ""
    };

    return(
        <Form className="login-form" onSubmit={props.submitForm}>
            {nonfielderrors}
            <h1 className="text-center">Sing up</h1>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    {...props.fields.email}
                />
                <Form.Control.Feedback type="invalid">
                  {props.fields.email.isInvalid}
                </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={props.loading ? null : props.submitForm}>
                {props.loading ? "Loading..." : "Sign up"}
            </Button>
        </Form>
    )
}

export default SignupForm