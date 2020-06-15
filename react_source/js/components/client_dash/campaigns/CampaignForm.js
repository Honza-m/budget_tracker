import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function CampaignForm(props) {
    return (
        <Row>
        <Col lg="3"></Col>
        <Col>
        <Form>
            <Form.Row>
                <Col>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        value={props.data.name}
                        onChange={props.updateField}
                        disabled={props.loading}
                        isInvalid={props.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                </Col>
                <Col sm="3">
                <Form.Group>
                    <Form.Label>Currency code</Form.Label>
                    <Form.Control 
                        name="currency"
                        maxLength="3"
                        value={props.data.currency}
                        onChange={props.updateField}
                        disabled={props.loading}
                        isInvalid={props.errors.currency}
                    />
                    <Form.Control.Feedback type="invalid">
                      {props.errors.currency}
                    </Form.Control.Feedback>
                </Form.Group>
                </Col>
                </Form.Row>

            <Form.Group>
                <Form.Label>Filter</Form.Label>
                <Form.Control
                    as="textarea"
                    name="name_filter"
                    value={props.data.name_filter}
                    onChange={props.updateField}
                    disabled={props.loading}
                    isInvalid={props.errors.name_filter}
                />
                <Form.Control.Feedback type="invalid">
                  {props.errors.name_filter}
                </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={props.loading ? null : props.submitForm}>
                {props.loading ? "Loading..." : "Save Campaign"}
            </Button>
        </Form>
        </Col>
        <Col lg="3"></Col>
        </Row>
    )
}

export default CampaignForm 