import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function NewPlatformForm(props) {
     if (this.props.nonFieldErrors) {
            var nonfielderrors = (
                <Alert variant="danger">
                    {this.props.nonFieldErrors}
                </Alert>
            )    
        } else {
            var nonfielderrors = ""
        }
    return (
        <div>
        {nonfielderrors}
        <h1 className="text-center">New Platform</h1>
        <Row>
        <Col lg="3"></Col>
        <Col>
        <Form>    
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    {...props.fields.name}
                />
                <Form.Control.Feedback type="invalid">
                  {props.fields.name.isInvalid}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Platform kind</Form.Label>
                <Form.Control
                    as="select"
                    {...props.fields.kind}
                >
                    <option value="manual">Manual upload</option>
                    <option disabled>Other options coming soon</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {props.fields.kind.isInvalid}
                </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={props.loading ? null : props.submitForm}>
                {props.loading ? "Loading..." : "Save Platform"}
            </Button>
        </Form>
        </Col>
        <Col lg="3"></Col>
        </Row>
        </div>
    )
}

export default NewPlatformForm