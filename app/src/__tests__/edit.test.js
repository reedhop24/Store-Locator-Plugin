import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import Edit from '../routes/edit/edit';

const setup = () => {
    const utils = render(<Edit/>);

    const storeName = utils.getByLabelText('New Store Name');
    const storeZip = utils.getByLabelText('New Store Zip');
    const storeCity = utils.getByLabelText('New Store City');
    const storeState = utils.getByLabelText('New Store State');
    const storeAddress = utils.getByLabelText('New Store Address');
    const storeQuant = utils.getByLabelText('New Store Quantity');
   
    return {
        ...utils,
        storeName,
        storeZip,
        storeQuant
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

    it('should add a new store', async () => {
        window.sessionStorage.setItem('companyID', '3a4736ff-9217-4f57-858c-3a562743f9e5');
        window.sessionStorage.setItem('email', 'reed@ibqsystems.com');
        window.sessionStorage.setItem('userPicture', 'https://lh4.googleusercontent.com/-HsfNh_1CWGE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnEb7XKmtNkVthaS0pZ6dp7iQDYsA/s96-c/photo.jpg');
        window.sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTEyMDQ0MjMwNTEyOTgwNTg5NTcxIiwiaWF0IjoxNjE0MjgxODEwfQ.yfNuSbC_iBWooorFroHp-XiryhBw5D2wqWlQIEJ4NBE');
        const {storeName, storeZip, storeQuant, storeCity, storeState, storeAddress} = setup();

        fireEvent.change(storeName, {target: {value: 'New Store'}});
        fireEvent.change(storeZip, {target: {value: '99203'}});fireEvent.change(storeZip, {target: {value: '99203'}});
        fireEvent.change(storeQuant, {target: {value: '8'}});
        fireEvent.change(storeState, {target: {value: 'WA'}});
        fireEvent.change(storeCity, {target: {value: 'Spokane'}});
        fireEvent.change(storeAddress, {target: {value: '618 W 23rd Ave'}});
        fireEvent.click(screen.getByText('Create'));
        
        await waitFor(() => screen.getByText('New Store'));
        expect(screen.getByText('New Store')).toHaveClass('store-name');
    });

});