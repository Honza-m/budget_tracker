import React from 'react';
import {withRouter} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import CampaignCurrency from '../../components/CampaignCurrency';

class BudgetForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
            <h1 className="text-center">New Budget</h1>
            <Row>
            <Col lg="3"></Col>
            <Col>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        {...this.props.fields.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.props.fields.name.isInvalid}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control 
                            type="date"
                            {...this.props.fields.start_date}
                        />
                        <Form.Control.Feedback type="invalid">
                          {this.props.fields.start_date.isInvalid}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col sm="6">
                    <Form.Group>
                        <Form.Label>End date</Form.Label>
                        <Form.Control
                            type="date"
                            {...this.props.fields.end_date}
                        />
                        <Form.Control.Feedback type="invalid">
                          {this.props.fields.end_date.isInvalid}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <CampaignCurrency
                                    pk={this.props.match.params.pk}
                                    camp={this.props.match.params.camp}
                                />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="number" 
                            {...this.props.fields.amount}
                        />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {this.props.fields.amount.isInvalid}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button 
                    onClick={this.props.loading ? null : this.props.submitForm}>
                    {this.props.loading ? "Loading..." : "Save Budget"}
                </Button>
            </Form>
             </Col>
            <Col lg="3"></Col>
            </Row>
            </div>
        )
    }
}

export default withRouter(BudgetForm)