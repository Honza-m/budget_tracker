import React from 'react';
import {useParams} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import CampaignCurrency from '../components/CampaignCurrency';


function CampaignDetailCards(props) {
    let {pk, camp} = useParams();
    const currency = <CampaignCurrency pk={pk} camp={camp} />
    return (
        <Row>
        <Col sm='12' md="6" xl="3">
            <Card className="text-center mb-3">
                <Card.Header as="h5">Campaign info</Card.Header>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        Last spend: {props.info.last_spend}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        <Col sm='12' md="6" xl="3">
            <Card className="text-center mb-3">
                <Card.Header as="h5">Totals</Card.Header>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        Budget: {Math.round(props.totals.budget)}
                        {" "}{currency}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Spend: {Math.round(props.totals.spend)}
                        {" "}{currency}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        <Col sm='12' md="6" xl="3">
            <Card className="text-center mb-3">
                <Card.Header as="h5">Daily stats</Card.Header>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        Average spend per day: {Math.round(props.totals.avg_spend_per_day)}
                        {" "}{currency}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Average buget per day: {Math.round(props.totals.avg_budget_per_day)}
                        {" "}{currency}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        <Col sm='12' md="6" xl="3">
            <Card className="text-center mb-3">
                <Card.Header as="h5">Difference</Card.Header>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        Total difference: {Math.round(props.totals.diff)}
                        {" "}{currency}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Average difference per day: {Math.round(props.totals.avg_diff_per_day)}
                        {" "}{currency}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
        </Row>
    )
}

export default CampaignDetailCards