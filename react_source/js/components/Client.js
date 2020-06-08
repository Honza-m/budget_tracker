import React from 'react';
import PaginationRow from './tables/Pagination';

class ClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            res: [],
        };
        this.baseURL = props.base + 'clients/summary/';
        this.loadData = this.loadData.bind(this);
    }

    loadData(url) {
        var x = this;
        const token = localStorage.getItem('auth');
        $.ajax({
            url: url,
            type: 'get',
            headers: {'Authorization': `Token ${token}`}
        })
        .done(function(res) {
            x.setState({
                isLoaded: true,
                res: res
            });
        })
        .fail(function(res) {
            console.log(res);
            x.setState({
                isLoaded: true,
                error: res.detail
            });
        });     
    }

    componentDidMount() {
        this.loadData(this.baseURL)
    }

    render() {
        const { error, isLoaded, res } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                <h1>Your clients</h1>
                <table className="table table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {res.results.map(item => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <PaginationRow
                    res={res}
                    baseURL={this.baseURL}
                    callback={this.loadData}
                />
                </div>
            );
        }
    }
}

export default ClientList