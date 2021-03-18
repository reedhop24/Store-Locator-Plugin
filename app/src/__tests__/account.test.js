import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import Account from '../routes/account/account';

const setup = () => {
    const utils = render(<Account/>);
    const email = utils.getByPlaceholderText('Email');
    const password = utils.getByPlaceholderText('Password');
   
    return {
        ...utils,
        email,
        password
    }
}

describe('Test Account Page', () => {

    it('should display Users Company Name', async () => {
        window.sessionStorage.setItem('companyID', '3a4736ff-9217-4f57-858c-3a562743f9e5');
        window.sessionStorage.setItem('email', 'reed@ibqsystems.com');
        window.sessionStorage.setItem('userPicture', 'https://lh4.googleusercontent.com/-HsfNh_1CWGE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEb7XKmtNkVthaS0pZ6dp7iQDYsA/s96-c/photo.jpg');
        window.sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE0MjgxODEwfQ.yfNuSbC_iBWooorFroHp-XiryhBw5D2wqWlQIEJ4NBE');
        setup();
        await waitFor(() => screen.getByText('New Company'));
        expect(screen.getByText('New Company')).toHaveClass('company-name');
    });

    it('should display all Users', async () => {
        window.sessionStorage.setItem('companyID', '3a4736ff-9217-4f57-858c-3a562743f9e5');
        window.sessionStorage.setItem('email', 'reed@ibqsystems.com');
        window.sessionStorage.setItem('userPicture', 'https://lh4.googleusercontent.com/-HsfNh_1CWGE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEb7XKmtNkVthaS0pZ6dp7iQDYsA/s96-c/photo.jpg');
        window.sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE0MjgxODEwfQ.yfNuSbC_iBWooorFroHp-XiryhBw5D2wqWlQIEJ4NBE');
        setup();
        await waitFor(() => screen.getByText('reed@ibqsystems.com'));
        expect(screen.getByText('reed@ibqsystems.com')).toHaveClass('user-email');
    });

    it('should add a new user', async () => {
        window.sessionStorage.setItem('companyID', '3a4736ff-9217-4f57-858c-3a562743f9e5');
        window.sessionStorage.setItem('email', 'reed@ibqsystems.com');
        window.sessionStorage.setItem('userPicture', 'https://lh4.googleusercontent.com/-HsfNh_1CWGE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEb7XKmtNkVthaS0pZ6dp7iQDYsA/s96-c/photo.jpg');
        window.sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE0MjgxODEwfQ.yfNuSbC_iBWooorFroHp-XiryhBw5D2wqWlQIEJ4NBE');
        const {email, password} = setup();

        fireEvent.change(email, {target: {value: 'reedyreed@gmail.com'}});
        fireEvent.change(password, {target: {value: 'Bushums24!'}});

        fireEvent.click(screen.getByText('Add User'));
        
        await waitFor(() => screen.getByText('reedyreed@gmail.com'));
        expect(screen.getByText('reedyreed@gmail.com')).toHaveClass('user-email');
    });

    it('should display modal when trying to add user that already exists', async () => {
        window.sessionStorage.setItem('companyID', '3a4736ff-9217-4f57-858c-3a562743f9e5');
        window.sessionStorage.setItem('email', 'reed@ibqsystems.com');
        window.sessionStorage.setItem('userPicture', 'https://lh4.googleusercontent.com/-HsfNh_1CWGE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEb7XKmtNkVthaS0pZ6dp7iQDYsA/s96-c/photo.jpg');
        window.sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE0MjgxODEwfQ.yfNuSbC_iBWooorFroHp-XiryhBw5D2wqWlQIEJ4NBE');
        const {email, password} = setup();

        fireEvent.change(email, {target: {value: 'kaylee@live.com'}});
        fireEvent.change(password, {target: {value: 'Bushums24!'}});

        fireEvent.click(screen.getByText('Add User'));
        
        await waitFor(() => screen.getByText('Email Already Registered'));
        expect(screen.getByText('Email Already Registered')).toHaveClass('modal-body');
    });

});