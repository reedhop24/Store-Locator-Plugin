import React, {useState} from 'react'
import {Container, Row, Col, Form} from 'react-bootstrap';
import GoogleAuth from './components/googleAuth';
import Login from './components/login';
import ErrorModal from '../modal/errorModal';
import CompanyModal from '../modal/newComModal';
import axios from 'axios';

const SignIn = ():JSX.Element => {
    const [currEmail, setCurrEmail] = useState<string>('');
    const [currPassword, setPassword] = useState<string>('');

    const [isShown, setIsShow] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');

    const [isShownCom, setIsShowCom] = useState<boolean>(false);
    const [googleToken, setGoogleToken] = useState<string>('');

    const handleSignIn = async ():Promise<void> => {
        try {
            if(currEmail === '' || currPassword === '') {
                setIsShow(true);
                setModalMessage('Fill in all fields');
            }  else {
                const signInRes = await axios.post('http://localhost:4000/signIn', {
                    email: currEmail, 
                    password: currPassword
                });

                if(signInRes.data.status === 'error') {
                    setIsShow(true);
                    setModalMessage(signInRes.data.message);
                } else {
                    console.log(signInRes);
                    window.sessionStorage.setItem('token', signInRes.data.auth.token);
                    window.sessionStorage.setItem('companyID', signInRes.data.user.CompanyID);
                    window.sessionStorage.setItem('email', signInRes.data.user.Email);
                    window.location.href = '/account';
                }
            }
        } catch(err) {
            setIsShow(true);
            setModalMessage(err.toString());
        }
    }

    const googleLogin = async (GoogleResponse): Promise<void> => {
        try {
            const response = await axios.post('http://localhost:4000/googleAuth', { token: GoogleResponse.tokenId });
            if(response.data.auth) {
                    window.sessionStorage.setItem('token', response.data.auth.token);
                    window.sessionStorage.setItem('companyID', response.data.user.CompanyID);
                    window.sessionStorage.setItem('email', response.data.user.Email);
                    window.sessionStorage.setItem('userPicture', response.data.user.Picture);
                    window.location.href = '/account';
            } else {
                if(response.data.status === 'error') {
                    setIsShow(true);
                    setModalMessage(response.data.message);
                } else {
                    setGoogleToken(GoogleResponse.tokenId);
                    window.sessionStorage.setItem('userPicture', response.data.user.Picture);
                    setIsShowCom(true);
                }
            }
        } catch(err) {
            setIsShow(true);
            setModalMessage(err.toString());
        }
    }
    return (
            <Container className="form-container">
                {isShown ? <ErrorModal shown={isShown} setIsShown={setIsShow} modalMsg={modalMessage} modalHead={'Error'}/> : null}
                {isShownCom ? <CompanyModal shown={isShownCom} emailVal={currEmail} passWordVal={currPassword} tokenID={googleToken} /> : null}
                <Row className="row">
                    <Col className="centered-col" id="test-col">
                        <h4>Login</h4>
                    </Col>
                </Row>
                <Row className="row">
                    <Col/>
                    <Col className="centered-col">
                    <Form className="form">
                        <Login emailH={setCurrEmail} passwordH={setPassword} signIn={handleSignIn}/>
                        <GoogleAuth handleGoogleLogin={googleLogin}/>
                    </Form>
                    </Col>
                    <Col/>
                </Row>
            </Container>
    )
}

export default SignIn;