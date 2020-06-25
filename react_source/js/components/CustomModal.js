import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Provide title, body, button, show as props
class CustomModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const JSX_MODAL = (
      <Modal show={this.props.show} backdrop="static" onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          {this.props.button}
        </Modal.Footer>
      </Modal>
    )
    return ReactDOM.createPortal(JSX_MODAL, document.querySelector("#modal"))
  }
}

export default CustomModal