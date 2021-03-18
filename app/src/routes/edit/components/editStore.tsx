import React from 'react';
import {Form, Button} from 'react-bootstrap';

const EditStore = ({editStoreNum, editStoreQuan, editStore, setShouldDelete}):JSX.Element => {
    return(
        <>
            <Form className="form">
                <h6>Edit Existing Store</h6>
                <Form.Group>
                    <Form.Label htmlFor="edit-number">Store Number</Form.Label>
                    <Form.Control id="edit-number" type="number" onChange={(ev) => editStoreNum(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="edit-quant">Store Quantity</Form.Label>
                    <Form.Control id="edit-quant" type="number" onChange={(ev) => editStoreQuan(ev.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check id="edit-delete" type="checkbox" label="Delete Store" onChange={(ev) => setShouldDelete(ev.target.checked)}/>
                </Form.Group>
                <div className="centered-button">
                    <Button onClick={() => editStore()}>Edit</Button>
                </div>
            </Form>
        </>
    )
}

export default EditStore;