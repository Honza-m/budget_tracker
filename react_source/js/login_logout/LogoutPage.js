import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


function LogoutPage() {
	// Remove cookie with token
	Cookies.remove('auth');
	return <Redirect to="/login/" />
}


export default LogoutPage