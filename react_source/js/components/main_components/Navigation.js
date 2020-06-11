import React from 'react';
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <div className="container-fluid p-0">
        <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Budget Tracker</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to='/dashboard/'>Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/test/'>Test</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/logout/'>Logout</Link>
                </li>
            </ul>
            </div>

        </nav>
        </div>
    )
}

export default Navigation