import React from 'react';
import {useParams} from 'react-router-dom';

import CreateRequest from '../../components/CreateRequest';
import PlatformForm from './PlatformForm';


function NewPlatform() {
    const {pk} = useParams();
    const url = `${process.env.BASEURL}clients/${pk}/platforms/`;
    const fields = {
        name: '',
        kind: 'manual'
    }

    return (
        <CreateRequest
            url={url}
            redirect={`/clients/${pk}/platforms/`}
            fields={fields}
            form={PlatformForm}
        />
    )
}

export default NewPlatform