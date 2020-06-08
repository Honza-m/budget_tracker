import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';


class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: false,
			token: null
		}
	}

	getFields(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	authenticate(e) {
		e.preventDefault();
		// Real authentication
		$.post(
			"http://127.0.0.1:8000/api/auth/",
			{
				'username': this.state.email,
				'password': this.state.password
			}
		)
		.done((res) => {
			this.setState({token: res.token})
		})
		.fail((res) => {
			console.log(res);
			this.setState({
				password: "",
				error: true
			});
		});
	}

	render() {
		if (this.state.token === null) {
			return (
				<LoginForm 
					email={this.state.email}
					password={this.state.password}
					error={this.state.error}
					callback={this.getFields.bind(this)}
					submitCallback={this.authenticate.bind(this)}
				/>
			)
		} else {
			localStorage.setItem('auth', this.state.token);
			return <Redirect to='/dashboard/' />
		}
	}

}


export default LoginPage