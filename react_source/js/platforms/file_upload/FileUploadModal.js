import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class FileUploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.state = {
            file: null
        }
    }

    handleModalClose() {
        this.props.setShow(false);
    }

    render () {
        const JSX_MODAL = (
        <Modal show={this.props.show} backdrop="static" onHide={this.handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload files</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group>
                    <Form.File label="CSV input" />
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
                    Upload
                </Button>
                <Button variant="secondary" onClick={this.handleModalClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
        )
        return ReactDOM.createPortal(JSX_MODAL, document.querySelector("#modal"))
    }
}

export default FileUploadModal