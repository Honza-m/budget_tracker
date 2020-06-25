import React from 'react';
import Table from 'react-bootstrap/Table';

import DeleteButton from '../components/DeleteButton';


function SpendTable(res, props) {
    return (
        <div>
            <Table className="mt-1">
                <thead>
                    <tr>
                        <th>Upload name</th>
                        <th>Date uploaded</th>
                        <th>Number of rows</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {res.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.date_uploaded}</td>
                        <td>{item.row_count}</td>
                        <td>
                            <DeleteButton 
                                url={`clients/${props.pk}/platforms/${props.plat}/spend-upload-records/${item.id}/`}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default SpendTable