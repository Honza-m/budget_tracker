import React from 'react';
import {useParams} from 'react-router-dom';

import ListRequest from '../components/ListRequest';
import PlatformsTable from './PlatformsTable';


function PlatformsPage() {
    let {pk} = useParams();
    return (
        <ListRequest
            baseURL={`${process.env.BASEURL}clients/${pk}/platforms/`}
            successRenderer={PlatformsTable}
            successProps={{pk: pk}}
        />
    )
}

export default PlatformsPage