import React from 'react';
import * as $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';

import Pagination from '../utils/Pagination';
import ClientCards from './ClientCards';
import DashboardNavigation from './DashboardNavigation';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			res: [],
		};
		this.baseURL = props.base + 'clients/summary/';
		this.pageSize = 6
		this.loadData = this.loadData.bind(this);
	}

	loadData(url) {
		var x = this;
		const token = localStorage.getItem('auth');
		$.ajax({
			url: url,
			type: 'get',
			headers: {'Authorization': `Token ${token}`}
		})
		.done(function(res) {
			x.setState({
				isLoaded: true,
				res: res
			});
		})
		.fail(function(res) {
			x.setState({
				isLoaded: true,
				error: res.detail
			});
		});     
	}

	componentDidMount() {
		this.loadData(this.baseURL + '?page_size=' + this.pageSize)
	}

	render() {
		const { error, isLoaded, res } = this.state;
		if (error) {
			return <div>Error: {error}</div>;
		} else if (!isLoaded) {
			return (
				<div className="d-flex justify-content-center">
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
				</div>
			);
		} else {
			return (
				<div>
				<DashboardNavigation/>
				<ClientCards data={res.results}/>
				<Pagination
					res={res}
					pageSize={this.pageSize}
					baseURL={this.baseURL}
					callback={this.loadData}
				/>
				</div>
			);
		}
	}
}

export default Dashboard