import React from 'react';
import ReactDOM from 'react-dom';
import ClientList from './components/Client.js';
import Navigation from './components/Navigation.js'


function App() {
    return (
        <div>
            <Navigation />
            <div className="container">
                <ClientList />
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);