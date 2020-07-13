import React from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import urls from '../urls/_URLs';


function Error404() {
    return (
        <div>
            <Navigation urls={urls}/>
            <div className="container text-center">
                <h1>Page not found</h1>
                <Link className="btn btn-primary btn-lg mt-3" to="/clients/">Go home</Link>
            </div>
        </div>
    )
}

export default Error404