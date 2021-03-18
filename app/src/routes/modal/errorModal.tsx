import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const ErrorModal = ({shown, setIsShown, modalMsg, modalHead}):JSX.Element => {
    return (
        <>
            <Modal show={shown}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHead}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsShown(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ErrorModal;