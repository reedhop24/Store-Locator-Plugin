import React, {useEffect, useState} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import UserList from './components/userList';
import NewUser from './components/newUser';
import ErrorModal from '../modal/errorModal';
import axios from 'axios';

const Account = ():JSX.Element => {

    const [companyName, setCompanyName] = useState<string>('');
    const [allUsers, setAllUsers] = useState<Array<object>>([]);

    const [showForm, setShowForm] = useState<boolean>(false);
    const [showDel, setShowDel] = useState<boolean>(false);

    const [newEmail, setNewEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const [delEmail, setDelEmail] = useState<string>('');
    const [delID, setDelID] = useState<string>('');

    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMsg, setModalMsg] = useState<string>('');

    const authToken = window.sessionStorage.getItem('token');
    const email = window.sessionStorage.getItem('email');
    const company = window.sessionStorage.getItem('companyID');

    const testPassword: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

    const renderUsers = async ():Promise<void> => {
        try {
            const getUsers = await axios.get<Array<object>>(`http://localhost:4000/getUsers?companyID=${company}`, {headers: {token:authToken}});
            if(getUsers.data.length !== 0) {
                setAllUsers(getUsers.data);
            } else {
                setModalMsg('No Users Found');
                setShowModal(true);
            }
        } catch(err) {
            setModalMsg(err.toString());
            setShowModal(true);
        }
    }

    useEffect(() => {
        (async ():Promise<void> => {
            try {
                const getCompany = await axios.get(`http://localhost:4000/getCompany?companyID=${company}&email=${email}`, {headers: {token:authToken}});

                if(getCompany.data.currCompany) {
                    setCompanyName(getCompany.data.currCompany.CompanyName);
                }

                await renderUsers();
            } catch(err) {
                setModalMsg(err.toString());
                setShowModal(true);
            }
        })();
    }, [authToken, company, email]);

    const submitNewUser = async ():Promise<void> => {
        try {
            if(newEmail === '' || newPassword === '') {
                setShowModal(true);
                setModalMsg('Fill in all fields');
            } else if(!testPassword.test(newPassword)) {
                setShowModal(true);
                setModalMsg('Password must be atleast six characters long and contain 1 uppercase character, 1 number, and 1 special character');
            } else {
                const registerRes = await axios.post('http://localhost:4000/register', {
                    email: newEmail,
                    password: newPassword,
                    CompanyID: company
                });
    
                if(registerRes.data.status === 'error') {
                    setModalMsg(registerRes.data.message);
                    setShowModal(true);
                }
    
                await renderUsers();
            }
        } catch(err) {
            setModalMsg(err.toString());
            setShowModal(true);
        }
    }

    const deleteUser = async ():Promise<void> => {
        try {
            if(delEmail === '' || delID === '') {
                setShowModal(true);
                setModalMsg('Fill in all fields');
            } else {
                const registerRes = await axios.post('http://localhost:4000/deleteUser', {
                    email: delEmail,
                    userID: delID
                }, {
                    headers: {token:authToken}
                });
    
                if(registerRes.data.status === 'error') {
                    setModalMsg(registerRes.data.message);
                    setShowModal(true);
                } else {
                    await renderUsers();
                }
            }
        } catch(err) {
            setModalMsg(err.toString());
            setShowModal(true);
        }
    }

    const newPlaceHolder:object = {
        field1: 'Email',
        field2: 'Password',
        field3: 'Add User'
    }

    const delPlaceHolder:object = {
        field1: 'Email',
        field2: 'User ID',
        field3: 'Delete User'
    }

    return (
        <Container>
            {showModal ? <ErrorModal shown={showModal} setIsShown={setShowModal} modalMsg={modalMsg} modalHead={'Error'}/>: null}
            <Row className="justify-content-md-center">
                <Col className="centered-col"><h4 className="company-name">{companyName}</h4></Col>
            </Row>
            <Row className="justify-content-md-center">
                <UserList users={allUsers}/>
            </Row>
            <Row className="justify-content-md-center">
                <h4>Add a New User</h4> <i className={showForm ? 'fas fa-minus' : 'fas fa-plus'} style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => setShowForm(!showForm)}></i>
            </Row>
            <Row className="justify-content-md-center">
                <NewUser setEmail={setNewEmail} setPassword={setNewPassword} handleUser={submitNewUser} placeholder={newPlaceHolder} isHidden={showForm}/>
            </Row>
            <Row className="justify-content-md-center">
                <h4>Delete a User</h4> <i className={showDel ? 'fas fa-minus' : 'fas fa-plus'} style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => setShowDel(!showDel)}></i>
            </Row>
            <Row className="justify-content-md-center">
                {showDel ? <NewUser setEmail={setDelEmail} setPassword={setDelID} handleUser={deleteUser} placeholder={delPlaceHolder} isHidden={showDel}/> : null}
            </Row>
        </Container>
    );
}

export default Account;