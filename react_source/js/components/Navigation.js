import React from 'react';
import {Link} from "react-router-dom";
import Breadcrumbs from './Breadcrumbs';

function Navigation(props) {
    return (
        <div className="container-fluid p-0">
        <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Budget Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <Breadcrumbs urls={props.urls} type="nav" />
                </ul>
                <div className="mr-2">
                    <Link className="btn btn-secondary" to='/logout/'>Logout</Link>
                </div>
            </div>

        </nav>
        </div>
    )
}

export default Navigation