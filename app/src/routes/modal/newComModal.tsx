import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

const CompanyModal = ({shown, emailVal, passWordVal, tokenID}):JSX.Element => {
    const [newCompany, setNewCompany] = useState<string>('');

    const postCompany = async () => {
        const companyRes = await axios.post('http://localhost:4000/newCompany', {companyName: newCompany});
        if(companyRes.data.id) {
            if(tokenID === '') {
                const registerRes = await axios.post('http://localhost:4000/register', {
                    email: emailVal,
                    password: passWordVal,
                    CompanyID: companyRes.data.id
                });
                if(registerRes.data.auth) {
                    window.sessionStorage.setItem('token', registerRes.data.auth.token);
                    window.sessionStorage.setItem('companyID', companyRes.data.id);
                    window.sessionStorage.setItem('email', registerRes.data.user.Email);
                    window.location.href = '/account';
                }
            } else {
                const googleRes = await axios.post('http://localhost:4000/googleAuth', { token: tokenID, CompanyID: companyRes.data.id });
                if(googleRes.data.auth) {
                    window.sessionStorage.setItem('token', googleRes.data.auth.token);
                    window.sessionStorage.setItem('companyID', companyRes.data.id);
                    window.sessionStorage.setItem('email', googleRes.data.user.Email);
                    window.location.href = '/account';
                }
            }
        }
    }

    return (
        <>
            <Modal show={shown}>
                <Modal.Header closeButton>
                    <Modal.Title>Register a Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Company Name:</Form.Label>
                            <Form.Control type="string" onChange={(ev) => setNewCompany(ev.target.value)}/>
                        </Form.Group>
                        <div className="centered-button">
                            <Button onClick={() => postCompany()}>Register</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CompanyModal;