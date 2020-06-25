import React from 'react';
import Table from 'react-bootstrap/Table';

import DeleteButton from '../components/DeleteButton';
import CampaignCurrency from '../components/CampaignCurrency';


function BudgetsTable(props) {
    return (
        <div>
            <Table className="mt-1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {props.res.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.start_date}</td>
                        <td>{item.end_date}</td>
                        <td>
                            <CampaignCurrency
                                pk={props.pk}
                                camp={props.camp}
                            />
                            {" "}{item.amount}
                        </td>
                        <td>
                            <DeleteButton 
                                url={`clients/${props.pk}/campaigns/${props.camp}/budgets/${item.id}/`}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default BudgetsTable