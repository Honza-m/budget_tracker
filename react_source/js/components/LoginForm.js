import React from 'react';


function LoginForm(props) {
	const errorClass = props.error ? "is-invalid" : ""
	return (
		<div className="container">
		<div className="login-card">
	        <form className="login-form needs-validation" noValidate>
	            <h1>Login page</h1>
	            <div className="form-group">
	                <label>Email:</label>
	                <input 
	                	type="email"
	                    className={`form-control ${errorClass}`}
	                    name="email"
	                	value={props.email}
	                	onChange={props.callback}
	                    required
	                />
	            </div>
	            <div className="form-group">
	                <label>Password:</label>
	                <input
	                	type="password"
	                    className={`form-control ${errorClass}`}
	                    name="password"
	                    value={props.password}
						onChange={props.callback}
	                    required
	                />
	            {props.error ? <div className="invalid-feedback">Wrong email or password</div> : null}
	            </div>
	            <button className="btn btn-success btn-block" onClick={props.submitCallback}>Login</button>
	        </form>
	    </div>
	    </div>
	)
}


export default LoginForm