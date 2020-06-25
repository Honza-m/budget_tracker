import React from 'react';
import {useParams, Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PlatformName from '../components/PlatformName';
import ListRequest from '../components/ListRequest';
import SpendTable from './SpendTable';

function SpendPage() {
    const {pk, plat} = useParams();
    return (
        <div>
        <Row>
            <Col sm="12" md="8">
                <h1>
                    Spend - <PlatformName pk={pk} plat={plat} />
                </h1>
            </Col>
            <Col className="text-right">
                <Link 
                    className="btn btn-success mt-2"
                    to={`/clients/${pk}/platforms/${plat}/spend/upload/`}
                >
                    Upload spend
                </Link>
            </Col>
        </Row>
        <ListRequest
            baseURL={`${process.env.BASEURL}clients/${pk}/platforms/${plat}/spend-upload-records/`}
            successRenderer={SpendTable}
            successProps={{pk: pk, plat: plat}}
        />
        </div>
    )
}

export default SpendPage