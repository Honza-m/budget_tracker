import React from 'react';
import * as $ from 'jquery';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';


class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.url = process.env.BASEURL + this.props.url;

        this.state = {
            status: 'active',  // loading, success, error
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.setState({status: 'loading'})
        var x = this;
        console.log(this.url);
        const token = Cookies.get('auth');
        $.ajax({
            url: x.url,
            type: 'DELETE',
            headers: {'Authorization': `Token ${token}`},
        })
        .done((res) => {
            x.setState({status: 'success'})
        })
        .fail((res) => {
            console.log(res.responseJSON);
            x.setState({status: 'error'})
        })


    }

    render(){
        const {status} = this.state;
        if (status == 'loading') {
            var buttonText = "Loading";
            var variant = 'danger';
        }
        else if (status == 'success') {
            var buttonText = "Deleted";
            var variant = 'secondary';
        }
        else if (status == 'error') {
            var buttonText = "Error";
            var variant = 'warning';
        }
        else {
            var buttonText = "Delete";
            var variant = 'danger';
        }

        return (
            <Button
                variant={variant}
                disabled={status == 'active' ? false : true}
                onClick={status == 'active' ? this.handleClick : null}
            >
                {buttonText}
            </Button>
        )
    }
}

export default DeleteButton