import React from 'react';
import * as $ from 'jquery';
import {Redirect} from 'react-router-dom';
import CampaignForm from './CampaignForm';

class NewCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: false,
            submitted: false,
            fields: {
                name: "",
                currency: "",
                name_filter: ""
            }
        };
        this.updateField = this.updateField.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    updateField(e) {
        const name = e.target.name;
        let val = e.target.value;
        val = name == 'currency' ? val.toUpperCase() : val
        this.setState((prevState) => {
            prevState.fields[name] = val;
            return prevState
        });
    }

    submitForm(e) {
        this.setState({loading: true});
        var x = this;
        const token = localStorage.getItem('auth');
        const url = (
            process.env.BASEURL + 'clients/' +
            this.props.match.params.pk + '/campaigns/'
        )
        $.ajax({
            url: url,
            type: 'POST',
            data: x.state.fields,
            headers: {'Authorization': `Token ${token}`},
        })
        .done((res) => {
            x.setState({
                loading: false,
                submitted: true
            })
        })
        .fail((res) => {
            x.setState({
                loading: false,
                errors: res.responseJSON
            })
        })

    }

    render() {
        const {errors, submitted} = this.state;
        if (submitted) {
            return <Redirect to={`/client/${this.props.match.params.pk}/`}/>
        }
        else {
            return (
                <div>
                <h1 className="text-center">New Campaign</h1>
                <CampaignForm
                    data={this.state.fields}
                    errors={this.state.errors}
                    updateField={this.updateField}
                    submitForm={this.submitForm}
                    loading={this.state.loading}
                />
                </div>
            )
        }
    }
}

export default NewCampaign