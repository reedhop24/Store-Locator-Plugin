import React from 'react'
import {Form, Button} from 'react-bootstrap';

const Login = ({emailH, passwordH, signIn}):JSX.Element => {

    return (
            <div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(ev) => emailH(ev.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(ev) => passwordH(ev.target.value)}/>
                </Form.Group>
                <div className="form-submit">
                    <a href="/signup">
                        No Account? Sign Up
                    </a>
                    <Button className="sign-in-btn" style={{marginLeft:"10px"}} onClick={() => signIn()}>
                        Sign In
                    </Button>
                </div>
            </div>
        )
                
}

export default Login;