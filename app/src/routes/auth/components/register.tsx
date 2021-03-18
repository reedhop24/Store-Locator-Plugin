import React from 'react';
import {Form, Button} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

const Register = ({handleRegister, setEmail, setPassword, setConfirm}):JSX.Element => {

    return (
        <div>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(ev) => setEmail(ev.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <i className="fa fa-info-circle" data-tip="Password must be atleast six characters long and contain 1 uppercase character, 1 number, and 1 special character" style={{fontSize: "20px", paddingRight:"5px"}}></i>
                <ReactTooltip />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" onChange={(ev) => setConfirm(ev.target.value)}/>
            </Form.Group>
            <div className="form-submit">
                <a href="/login">
                    Registered? Login
                </a>
                <Button variant="primary" style={{marginLeft:"10px"}} onClick={() => handleRegister()}>
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default Register;
