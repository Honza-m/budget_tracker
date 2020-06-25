import React from 'react';
import * as $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';

import Pagination from './Pagination';


class ListRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            res: [],
        };
        this.loadData = this.loadData.bind(this)
        
        // Provide the below
        // this.props.successRenderer
        // this.props.successProps
        this.baseURL = this.props.baseURL
        this.pageSize = this.props.pageSize || 6
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
            console.log(res);
            x.setState({
                isLoaded: true,
                error: res.responseJSON.detail
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
                <React.Fragment>
                {this.props.successRenderer(res.results, this.props.successProps)}
                <Pagination
                    res={res}
                    pageSize={this.pageSize}
                    baseURL={this.baseURL}
                    callback={this.loadData}
                />
                </React.Fragment>
            )
        }
    }
}

export default ListRequest