import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import Header from './Header';


function PlatformsTable(res, props) {
    return (
        <div>
            <Header />
            <Table className="mt-1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kind</th>
                    </tr>
                </thead>
                <tbody>
                {res.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <Link to={`/clients/${props.pk}/campaigns/platforms/${item.id}/spend/`}>
                                {item.name}
                            </Link>
                        </td>
                        <td>{item.kind}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default PlatformsTable