import React from 'react';
import SignupForm from './SignupForm';
import CreateRequest from '../components/CreateRequest';


function SignupPage(props) {
    const url = `${process.env.BASEURL}users/signup/`;
    const fields = {
        email: ''
    }
    return (
        <CreateRequest
            dontAuthorize={true}
            url={url}
            redirect="/signup/check-email/"
            fields={fields}
            form={SignupForm}
        />
    )
}

export default SignupPage