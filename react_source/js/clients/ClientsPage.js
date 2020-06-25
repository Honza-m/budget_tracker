import React from 'react';
import * as $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';

import ListRequest from '../components/ListRequest';
import Pagination from '../components/Pagination';
import ClientCards from './ClientCards';
import Header from './Header';

function pageContents(results){
	return (
	  	<React.Fragment>
        	<Header />
        	<ClientCards data={results} />
     	</React.Fragment>
     )
}

function ClientsPage(){
	return (
		<ListRequest 
			baseURL={process.env.BASEURL + 'clients/'}
			successRenderer={pageContents}
		/>
	)
}

export default ClientsPage