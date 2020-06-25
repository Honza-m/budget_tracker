import React from 'react';
import * as $ from 'jquery';
import {withRouter, Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PlatformName from '../components/PlatformName';


class UploadSpend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            loading: false,
            success: false
        };
        this.fileInput = React.createRef();
        this.pk = this.props.match.params.pk;
        this.plat = this.props.match.params.plat;
        this.url = `${process.env.BASEURL}clients/${this.pk}/platforms/${this.plat}/spend/upload/`;
        this.redirect = `/clients/${this.pk}/platforms/${this.plat}/spend/`;
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        this.setState({loading: true});
        var x = this;
        const token = localStorage.getItem('auth');

        var fdata = new FormData();
        fdata.append("csvfile", this.fileInput.current.files[0]);
        $.ajax({
            url: x.url,
            type: 'POST',
            data: fdata,
            processData: false,
            contentType: false,
            headers: {'Authorization': `Token ${token}`},
        })
        .done((res) => {
            x.setState({
                loading: false,
                success: true
            })
        })
        .fail((res) => {
            console.log(res);
            x.setState({
                loading: false,
                errors: res.responseText
            })
        })
    }

    render() {
        const {errors, loading, success} = this.state;
        if (success) {
            return <Redirect to={this.redirect} />
        }
        else if (errors) {
            return errors
        }
        else {
            return(
                <div>
                <h1>Upload spend to <PlatformName pk={this.pk} plat={this.plat} /></h1>
                <Form>
                    <Form.Group>
                        <Form.File 
                            label="Upload CSV"
                            name="file"
                            ref={this.fileInput}
                        />
                    </Form.Group>
                    <Button onClick={loading ? null : this.submitForm}>
                        {loading ? "Loading..." : "Upload spend"}
                    </Button>
                </Form>
                </div>
            )
        }
    }
}

export default withRouter(UploadSpend)