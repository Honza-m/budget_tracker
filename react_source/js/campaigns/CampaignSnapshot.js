import React from 'react'
import * as $ from 'jquery';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';


class CampaignSnapshot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            res: {}
        }
    }

    componentDidMount() {
        var x = this;
        const token = Cookies.get('auth');
        $.ajax({
            url: `${process.env.BASEURL}campaign-performance/${this.props.camp}/?filters=totals`,
            type: 'get',
            headers: {'Authorization': `Token ${token}`}
        })
        .done(function(res) {
            x.setState({
                loading: false,
                res: res
            });
        })
        .fail(function(res) {
            console.log(res);
            x.setState({
                loading: false,
                error: true
            });
        });     
    }

    render() {
        const {loading, error, res} = this.state;
        if (error) {
            return <Card.Text>Couldn't retrieve data</Card.Text>
        }
        else if (loading) {
            return (
                <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
            )
        }
        else {
            return (
                <Card.Text>
                    Spend:{Math.round(res.totals.spend)} {this.props.currency}<br/>
                    Budget: {Math.round(res.totals.budget)} {this.props.currency}<br />
                    Difference: {Math.round(res.totals.diff)} {this.props.currency}

                </Card.Text>
            )
        }

    }
}

export default CampaignSnapshot