import React from 'react'
import * as $ from 'jquery';
import { withRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import DetailHeader from './DetailHeader';


class CampaignDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            data: {}
        }

        this.pk = this.props.match.params.pk;
        this.camp = this.props.match.params.camp;
    }

    componentDidMount() {
        var x = this;
        const token = localStorage.getItem('auth');
        $.ajax({
            url: `${process.env.BASEURL}campaign-performance/${x.camp}/`,
            type: 'GET',
            headers: {'Authorization': `Token ${token}`},
        })
        .done((res) => {
            x.setState({
                loading: false,
                data: res
            })
        })
        .fail((res) => {
            console.log(res);
            x.setState({
                loading: false,
                error: res.responseText
            })
        })
    }

    render() {
        const {loading, error, data} = this.state;
        if (loading) {
            return <div><DetailHeader pk={this.pk} camp={this.camp} /><h2>Loading</h2></div>
        }
        else if (error){
            return <div><DetailHeader pk={this.pk} camp={this.camp} /><h2>Error</h2></div>
        }
        else {
            return (
                <React.Fragment>
                <DetailHeader 
                    pk={this.pk} camp={this.camp}
                />
                <h2>Chart</h2>
                <Line 
                    data={data}
                />
                </React.Fragment>
            )
        }
    }
}

export default withRouter(CampaignDetail)