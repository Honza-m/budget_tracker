import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

import FileUploadModal from './FileUploadModal';


function FileUploadButton() {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button 
                onClick={() => setShowModal(true)}
            > 
                Upload files 
            </Button>
            <FileUploadModal
                show={showModal}
                setShow={setShowModal}
            />
        </React.Fragment>
    )
}

export default FileUploadButton