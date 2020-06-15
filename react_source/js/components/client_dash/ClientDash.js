import React from 'react';
import * as $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';

import Pagination from '../utils/Pagination';
import CampaignCards from './CampaignCards';
import Header from './ClientDashHeader';


class ClientDash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            res: []
        }
        this.baseURL = (
            process.env.BASEURL + 'clients/' +
            this.props.match.params.pk + '/campaigns/'
        )
        this.pageSize = 6
        this.getCampaigns = this.getCampaigns.bind(this)
    }

    getCampaigns(url) {
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
                error: res.responseJSON.detail
            });
        });     
    }

    componentDidMount() {
        this.getCampaigns(this.baseURL + '?page_size=' + this.pageSize)
    }

    render() {
        const {error, isLoaded, res} = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        }
        else if (!isLoaded) {
            return (
                <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
            )
        }
        else {
            return(
                <div>
                <Header 
                    clientPK={this.props.match.params.pk}
                />
                <CampaignCards data={res.results} />
                <Pagination
                    res={res}
                    pageSize={this.pageSize}
                    baseURL={this.baseURL}
                    callback={this.getCampaigns}
                />
                </div>
            )
        }
    }
}


export default ClientDash