import React from 'react';
import { Redirect } from 'react-router-dom';


function LogoutPage() {
	// Remove cookie with token
	localStorage.removeItem('auth');
	return <Redirect to="/login/" />
}


export default LogoutPage