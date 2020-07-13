import React from 'react'
import { withRouter } from 'react-router-dom';
import * as $ from 'jquery';
import Cookies from 'js-cookie';
import ChartComponent from 'react-chartjs-2';
import Masonry from 'react-masonry-css';
import Card from 'react-bootstrap/Card';

import DetailHeader from './DetailHeader';
import CampaignDetailCards from './CampaignDetailCards';


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
        const token = Cookies.get('auth');
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

    getDailyData(data) {
        // Set up data object
        var res = {
            labels: data.daily_index,
            datasets: []
        }
        // Go through all daily datasets
        for (let each in data.daily_data) {
            // Create data
            let line = {}
            line.label = each
            line.data = data.daily_data[each]
            // Conditionally highlight
            if (each == 'Budgets') {
                line.backgroundColor = '#0275d8'
                line.type = 'bar'
            } else {
                line.borderColor = '#292b2c'
            }
            res.datasets.push(line)
        }
        return res
    }

    getDiffData(data) {
        var res = {
            labels: data.daily_index,
            datasets: [{
                label: 'Daily cummulative difference',
                data: data.cum_diff,
                backgroundColor: null
            }]
        }
        return res
    }

    render() {
        const plugin = {
           beforeDraw: function(c) {
              var data = c.data.datasets[0].data;
              for (let i in data) {
                 let bar = c.data.datasets[0]._meta[Object.keys(c.data.datasets[0]._meta)[0]].data[i]._model;
                 if (data[i] >= 0) {
                    bar.borderColor = '#5cb85c';
                 } else bar.borderColor = '#d9534f';
              }
           }
        };
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

                <CampaignDetailCards 
                    totals={data.totals}
                    info={data.info}
                />

                <div>
                <ChartComponent
                    type={"line"}
                    data={this.getDiffData(data)}
                    height={300}
                    options={{maintainAspectRatio: false}}
                    plugins={[plugin]}
                />
                </div>
                <div>
                <ChartComponent
                    type={"line"}
                    data={this.getDailyData(data)}
                    height={300}
                    options={{scales: {yAxes: [{stacked: true}]}, maintainAspectRatio: false}}
                />
                </div>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(CampaignDetail)