import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import * as $ from 'jquery';
import Spinner from 'react-bootstrap/Spinner';


class ConfirmToken extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            res: null
        }
    }
    
    componentDidMount() {
        sessionStorage.setItem('signup-uid', this.props.match.params.uid);
        sessionStorage.setItem('signup-token', this.props.match.params.token)
        var x = this
        $.ajax({
            url: `${process.env.BASEURL}users/signup/next-step/${this.props.match.params.uid}/`,
            type: 'get'
        })
        .done(function(res) {
            x.setState({
                loading: false,
                res: res.next_step
            });
        })
        .fail(function(res) {
            console.log(res);
            x.setState({
                loading: false,
            });
        });
    }

    render() {
        const {loading, res} = this.state;
        if (loading) {
            return (
                <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
            )
        }
        else if(res == 'organization') {
            return <Redirect to="/signup/organization/" />
        }
        else if(res == 'password') {
            return <Redirect to="/signup/password/" />
        }
        else if(res == 'login') {
            return <Redirect to="/login/" />
        }
        else {
            return <h1>Error - link invalid</h1>
        }
    }
}

export default ConfirmToken