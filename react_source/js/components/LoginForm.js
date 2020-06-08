import React from 'react';


function LoginForm(props) {
	return (
		<form>
			<label>Email:</label>
			<input 
				type="text" 
				name="email"
				value={props.email}
				onChange={props.callback}
			/>
			<label>Password:</label>
			<input 
				type="password"
				name="password"
				value={props.password}
				onChange={props.callback}
			/>
			{props.error ? <p><b>Wrong email or password</b></p> : null}
			<button onClick={props.submitCallback}>Login</button>
		</form>
	)
}


export default LoginForm