import React, {useState} from 'react';
import Register from './components/register';
import GoogleAuth from './components/googleAuth';
import {Container, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import ErrorModal from '../modal/errorModal';
import CompanyModal from '../modal/newComModal';

const Signup = ():JSX.Element => {
  const [isShown, setIsShow] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const [currEmail, emailH] = useState<string>('');
  const [currPassword, passwordH] = useState<string>('');

  const [currConfirm, confirmH] = useState<string>('');
  const [isShownCom, setIsShowCom] = useState<boolean>(false);

  const [googleToken, setGoogleToken] = useState<string>('');

  const register = async ():Promise<void> => {
    var testPassword: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

    try {
        if(currPassword !== currConfirm) {
            setIsShow(true);
            setModalMessage('Passwords do not match');
        } else if(currEmail === '' || currPassword === '' || currConfirm === '') {
            setIsShow(true);
            setModalMessage('Fill in all fields');
        } else if(!testPassword.test(currPassword)) {
            setIsShow(true);
            setModalMessage('Password must be atleast six characters long and contain 1 uppercase character, 1 number, and 1 special character');
        } else {
            const registerRes = await axios.post('http://localhost:4000/register', {
                email: currEmail,
                password: currPassword,
            });

            if(!registerRes.data.auth && registerRes.data.user) {
                if(!registerRes.data.user.CompanyID) {
                    setIsShowCom(true);
                } 
            } else {
                setIsShow(true);
                setModalMessage(registerRes.data.message);
            }
        }
    } catch(err) {
        setIsShow(true);
        setModalMessage(err.toString());
    }
}

const googleLogin = async (GoogleResponse): Promise<void> => {
    try {
        const response = await axios.post('http://localhost:4000/googleAuth', { token: GoogleResponse.tokenId, CompanyID: undefined });
        if(response.data.auth) {
            window.sessionStorage.setItem('token', response.data.auth.token);
            window.sessionStorage.setItem('companyID', response.data.user.CompanyID);
            window.sessionStorage.setItem('email', response.data.user.Email);
            window.sessionStorage.setItem('userPicture', response.data.picture.image);
            window.location.href = '/account';
        } else {
            if(response.data.status === 'error') {
                setIsShow(true);
                setModalMessage(response.data.message);
            } else {
                setGoogleToken(GoogleResponse.tokenId);
                setIsShowCom(true);
            }
        }
    } catch(err) {
        setIsShow(true);
        setModalMessage(err.toString());
    }
}

  return (
      <Container>
          {isShown ? <ErrorModal shown={isShown} setIsShown={setIsShow} modalMsg={modalMessage} modalHead={'Error'}/> : null}
          {isShownCom ? <CompanyModal shown={isShownCom} emailVal={currEmail} passWordVal={currPassword} tokenID={googleToken}/> : null}
          <Row className="row">
            <Col className="centered-col">
                <h4>Signup</h4>
            </Col>
          </Row>
          <Row className="row">
              <Col/>
              <Col className="centered-col">
              <Form className="form">
                <Register handleRegister={register} setEmail={emailH} setPassword={passwordH} setConfirm={confirmH}/>
                <GoogleAuth handleGoogleLogin={googleLogin}/>
               </Form>
              </Col>
              <Col/>
          </Row>
      </Container>
  );
}

export default Signup;