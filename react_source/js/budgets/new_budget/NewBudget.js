import React from 'react';
import {useParams} from 'react-router-dom';

import CreateRequest from '../../components/CreateRequest';
import BudgetForm from './BudgetForm';


function NewBudget(props) {
    const {pk, camp} = useParams();
    const url = `${process.env.BASEURL}clients/${pk}/campaigns/${camp}/budgets/`;
    const fields = {
        name: '',
        start_date: '',
        end_date: '',
        amount: 0,
    }
    return (
        <CreateRequest
            url={url}
            redirect={`/clients/${pk}/campaigns/${camp}/budgets/`}
            fields={fields}
            form={BudgetForm}
        />
    )
}

export default NewBudget
