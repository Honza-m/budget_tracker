import React from 'react';

class ClientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        var x = this
        $.get("http://127.0.0.1:8000/api/clients/?format=json")
        .done(function(res) {
            x.setState({
                isLoaded: true,
                items: res
            });
        })
        .fail(function(res) {
            x.setState({
                isLoaded: true,
                error: res
            });
        });        
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <table className="table table-stripped">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }
}

export default ClientList