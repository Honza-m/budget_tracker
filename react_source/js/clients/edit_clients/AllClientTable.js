import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function AllClientTable(props) {
    return (
        <React.Fragment>
        <Row>
            <Col><h1>Your clients</h1></Col>
            <Col className="text-right">
                <Link to="/dashboard/" className="mt-2 mr-1 btn btn-secondary">Cancel</Link> 
                <Button variant="success" className="mt-2" onClick={props.saveClients}>Save your clients</Button>
            </Col>
        </Row>
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Client</th>
                </tr>
            </thead> 
            <tbody>
            {props.data.map((item) => (
                <tr key={item.id}>
                    <td>
                        <input 
                            type="checkbox"
                            name={item.id}
                            checked={props.isChecked(item.id)}
                            onChange={props.handleCheck}
                        />
                    </td>
                    <td><a name={item.id} onClick={props.handleCheck}>{item.name}</a></td>
                </tr>
            ))}
            </tbody>
        </Table>
        </React.Fragment>
    )
}


export default AllClientTable