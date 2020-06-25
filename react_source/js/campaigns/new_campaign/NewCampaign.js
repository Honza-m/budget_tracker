import React from 'react';
import {useParams} from 'react-router-dom';

import CreateRequest from '../../components/CreateRequest';
import CampaignForm from './CampaignForm';


function NewCampaign(props) {
    const {pk} = useParams();
    const url = `${process.env.BASEURL}clients/${pk}/campaigns/`;
    const fields = {
        name: '',
        currency: '',
        name_filter: '',
        platforms: []
    }
    return (
        <CreateRequest
            url={url}
            redirect={`/clients/${pk}/campaigns/`}
            fields={fields}
            form={CampaignForm}
        />
    )
}

export default NewCampaign