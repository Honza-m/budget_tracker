import React from 'react';
import {Redirect} from 'react-router-dom';
import * as $ from 'jquery';

// Supply fields as props
// fields = {field1: 'initialvalue', field2: 'intitial'}
// Supply url as props
// Supply form JSX as props
class CreateRequest extends React.Component {
    constructor(props) {
        super(props);

        // Expected props
        const fields = this.props.fields;
        this.url = this.props.url;
        this.redirect = this.props.redirect;
        this.form = this.props.form;

        this.state = {
            loading: false,
            errors: false,
            submitted: false,
            fields: fields
        };
        this.updateField = this.updateField.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    updateField(e) {
        const name = e.target.name;
        if (e.target.multiple) {
            // Handle select multiple
            var val = [...e.target.selectedOptions].map(opt => Number(opt.value));
        } else {
            // Handle normal inputs
            var val = e.target.value;
        }
        // Special rule for currency field
        val = name == 'currency' ? val.toUpperCase() : val
        
        // Save value
        this.setState((prevState) => {
            prevState.fields[name] = val;
            return prevState
        });
    }

    submitForm(e) {
        this.setState({loading: true});
        var x = this;
        const token = localStorage.getItem('auth');
        $.ajax({
            url: this.url,
            type: 'POST',
            data: JSON.stringify(x.state.fields),
            contentType: 'application/json',
            headers: {'Authorization': `Token ${token}`},
        })
        .done((res) => {
            x.setState({
                loading: false,
                submitted: true
            })
        })
        .fail((res) => {
            console.log(res);
            x.setState({
                loading: false,
                errors: res.responseJSON
            })
        })

    }

    render() {
        const {errors, submitted} = this.state;
        if (submitted) {
            return <Redirect to={this.redirect}/>
        }
        else {
            // Get default values and actions for each field
            const formProps = {
                loading: this.state.loading,
                submitForm: this.submitForm,
                fields: {}
            }
            for (name of Object.keys(this.state.fields)) {
                formProps.fields[name] = {
                    name: name,
                    value: this.state.fields[name],
                    onChange: this.updateField,
                    disabled: this.state.loading,
                    isInvalid: this.state.errors[name]
                }
            }
            return this.form(formProps)
        }
    }
}

export default CreateRequest
