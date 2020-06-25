import React from 'react';
import {useParams} from 'react-router-dom';

import ListRequest from '../components/ListRequest';
import CampaignCards from './CampaignCards';
import Header from './Header';


function pageContents(results) {
    return (
        <React.Fragment>
            <Header />
            <CampaignCards data={results} />
        </React.Fragment>
    )
}


function CampaignsPage() {
    let {pk} = useParams();
    return (
        <ListRequest 
            baseURL={`${process.env.BASEURL}clients/${pk}/campaigns/`}
            successRenderer={pageContents}
        />
    )
}


export default CampaignsPage