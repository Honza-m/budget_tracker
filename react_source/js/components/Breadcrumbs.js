import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Breadcrumbs(props) {
    const match = useRouteMatch()
    let crumbs = props.urls.filter(({url}) => (
        match.path.includes(url)
    ))
    crumbs = crumbs.map(({ url, ...rest }) => ({
        url: Object.keys(match.params).length
            ? Object.keys(match.params).reduce(
                (path, param) => path.replace(
                    `:${param}`, match.params[param]
                ), url
            )
            : url,
        ...rest
    }));
    crumbs = crumbs.sort((a, b) => (
        a.url.length > b.url.length
    ))
    if (props.type == 'breadcrumb') {
        return(
            crumbs.map(({name, url}, key) => {
                if(key + 1 == crumbs.length){
                    return (
                        <li
                            key={key}
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            {name}
                        </li>
                    )
                } else {
                    return (
                        <li 
                            key={key}
                            className="breadcrumb-item"
                        >
                            <Link to={url}>{name}</Link>
                        </li>
                    )
                }
            })
        )
    } else {
        return(
            crumbs.map(({name, url}, key) => {
                if(key + 1 == crumbs.length){
                    return (
                        <li
                            key={key}
                            className="nav-item active"
                            aria-current="page"
                        >
                            <a href="#" className="nav-link">{name}</a>
                        </li>
                    )
                } else {
                    return (
                        <li 
                            key={key}
                            className="nav-item"
                        >
                            <Link to={url} className="nav-link">{name}</Link>
                        </li>
                    )
                }
            })
        )
    }
}

export default Breadcrumbs