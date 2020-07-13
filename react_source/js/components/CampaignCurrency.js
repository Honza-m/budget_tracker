import React from 'react';
import * as $ from 'jquery';
import Cookies from 'js-cookie';


class CampaignCurrency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null
        }
    }

    componentDidMount() {
        var x = this;
        const token = Cookies.get('auth');
        $.ajax({
            url: `${process.env.BASEURL}clients/${this.props.pk}/campaigns/${this.props.camp}/`,
            type: 'get',
            headers: {'Authorization': `Token ${token}`}
        })
        .done((res) => {
            x.setState({result: res.currency});
        })
        .fail((res) => {console.log(res);})
    }

    render() {return this.state.result}
}

export default CampaignCurrency