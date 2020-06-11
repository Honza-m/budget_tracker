import React from 'react';
import * as $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';

import Pagination from '../../utils/Pagination';
import AllClientTable from './AllClientTable';


class EditClients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            allClients: [],
            userClients: [],
            redirect: false
        };
        this.baseURL = props.base;
        this.loadData = this.loadData.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.isChecked = this.isChecked.bind(this);
        this.saveClients = this.saveClients.bind(this);
    }

    loadData(url) {
        // Load pages of allClients
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
                allClients: res
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
        // Get a list of all users 
        var x = this;
        const token = localStorage.getItem('auth');
        $.ajax({
            url: x.baseURL + 'users/client-set/',
            type: 'get',
            headers: {'Authorization': `Token ${token}`}
        })
        .done((res) => {
            x.setState({
                userClients: res.results
            })
            // When done, load first page of all clients
            x.loadData(x.baseURL + 'clients/')
        })
        .fail((res) => {
            x.setState({
                isLoaded: true,
                error: res.responseJSON.detail
            })
        })
    }

    handleCheck(e) {
        const pk = Number(e.target.name);
        this.setState((prevState) => {
            const index = prevState.userClients.indexOf(pk);
            // Add to userClients if checked
            if (index == -1) {
                prevState.userClients.push(pk)
            }
            // If unchecked, remove from userClients
            else {
                prevState.userClients.splice(index, 1)
            }
            return prevState
        })
    }

    isChecked(pk) {
        return this.state.userClients.includes(pk) ? true : false
    }

    saveClients(e) {
        e.preventDefault();
        var x = this;
        const token = localStorage.getItem('auth');
        $.ajax({
            url: x.baseURL + 'users/client-set/',
            type: 'POST',
            data: JSON.stringify(x.state.userClients),
            contentType: 'application/json',
            headers: {'Authorization': `Token ${token}`},
        })
        .done((res) => {
            x.setState({redirect: true})
        })
        .fail((res) => {
            x.setState({error: res.responseJSON.detail})
        })
    }

    render() {
        const { error, isLoaded, res, redirect } = this.state;
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
        } else if (redirect) {
            return <Redirect to="/dashboard"/>
        } else {
            return (
                <div>
                <AllClientTable
                    data={this.state.allClients.results}
                    handleCheck={this.handleCheck}
                    isChecked={this.isChecked}
                    saveClients={this.saveClients}
                />
                <Pagination
                    res={this.state.allClients}
                    baseURL={this.baseURL + 'clients/'}
                    callback={this.loadData}
                />
                </div>
            );
        }
    }
}

export default EditClients