import React from 'react';
import * as $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';

import Header from './PlatformHeader';


class ClientPlatforms extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Header 
                name="clientname"
                clientPK={this.props.match.params.pk}
            />
        )
    }
}

export default ClientPlatforms