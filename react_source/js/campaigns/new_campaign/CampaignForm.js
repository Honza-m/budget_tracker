import React from 'react';
import {withRouter} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListRequest from '../../components/ListRequest';


function PlatformSelector(results, props) {
    return (
        <Form.Control 
            as="select"
            multiple
            {...props}
        >
        {results.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ))}
        </Form.Control>
    )
}


class CampaignForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <h1 className="text-center">New Campaign</h1>
            <Row>
            <Col lg="3"></Col>
            <Col>
            <Form>
                <Form.Row>
                    <Col>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            {...this.props.fields.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {this.props.fields.name.isInvalid}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col sm="3">
                    <Form.Group>
                        <Form.Label>Currency code</Form.Label>
                        <Form.Control
                            maxLength="3"
                            {...this.props.fields.currency}
                        />
                        <Form.Control.Feedback type="invalid">
                          {this.props.fields.currency.isInvalid}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    </Form.Row>

                <Form.Group>
                    <Form.Label>Platforms</Form.Label>
                    <ListRequest
                        baseURL={`${process.env.BASEURL}clients/${this.props.match.params.pk}/platforms/`}
                        successRenderer={PlatformSelector}
                        successProps={this.props.fields.platforms}
                        pageSize={null}
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.props.fields.platforms.isInvalid}
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Filter</Form.Label>
                    <Form.Control
                        as="textarea"
                        {...this.props.fields.name_filter}
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.props.fields.name_filter.isInvalid}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button onClick={this.props.loading ? null : this.props.submitForm}>
                    {this.props.loading ? "Loading..." : "Save Campaign"}
                </Button>
            </Form>
            </Col>
            <Col lg="3"></Col>
            </Row>
            </div>
        )
    }
}

export default withRouter(CampaignForm)