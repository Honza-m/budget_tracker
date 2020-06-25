import React from 'react';
import * as $ from 'jquery';


class ClientName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null
        }
    }

    componentDidMount() {
        var x = this;
        const token = localStorage.getItem('auth');
        $.ajax({
            url: `${process.env.BASEURL}clients/${this.props.pk}/`,
            type: 'get',
            headers: {'Authorization': `Token ${token}`}
        })
        .done((res) => {
            x.setState({result: res.name});
        })
        .fail((res) => {console.log(res.responseJSON);})
    }

    render() {return this.state.result}
}

export default ClientName