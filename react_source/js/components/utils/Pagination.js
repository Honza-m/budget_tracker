import React from 'react';


class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        e.preventDefault();
        this.props.callback(e.target.getAttribute('url'));
    }

    render() {
        const baseURL = this.props.baseURL
        const res = this.props.res;
        const currentPage = this.props.res.current_page;
        const firstPage = 1;
        const lastPage = this.props.res.total_pages;
        const pageSize = this.props.pageSize ? "&page_size="+this.props.pageSize : ""
        // Return nothing if no need for pagination
        if (firstPage == lastPage){return null};
        // If this is first page or last page, disable buttons
        const prevDisabled = res.previous ? "" : " disabled";
        const nextDisabled = res.next ? "" : " disabled";
        // Get next two and previous two pages (if possible)
        let prevPages = [];
        let nextPages = [];
        for (let i = 1; i < 3; i++){
            if(currentPage - i >= firstPage ){prevPages.push(currentPage - i)};
            if(currentPage + i <= lastPage ){nextPages.push(currentPage + i)};
        };
        prevPages = prevPages.reverse();

        return (
            <nav aria-label="Table pagination">
                <ul className="pagination justify-content-center">
                <li key="0" className={"page-item" + prevDisabled}>
                    <a className="page-link" href="#" onClick={this.onClick} url={res.previous}>Previous</a>
                </li>
                {prevPages.map(i => (
                    <li key={i} className="page-item">
                        <a className="page-link" href="#" onClick={this.onClick} url={baseURL+"?page="+i+pageSize}>{i}</a>
                    </li>
                ))}
                <li className="page-item active">
                    <span className="page-link">{currentPage}</span>
                </li>
                {nextPages.map(i => (
                    <li key={i} className="page-item">
                        <a className="page-link" href="#" onClick={this.onClick} url={baseURL+"?page="+i+pageSize}>{i}</a>
                    </li>
                ))}
                <li key={lastPage+1} className={"page-item" + nextDisabled}>
                    <a className="page-link" href="#" onClick={this.onClick} url={res.next}>Next</a>
                </li>
                </ul>
            </nav>
        )
    }
}


export default Pagination