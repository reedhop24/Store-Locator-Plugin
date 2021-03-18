import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import SignIn from '../routes/auth/signIn';

const setup = () => {
    const utils = render(<SignIn/>);
    const email = utils.getByLabelText('Email');
    const password = utils.getByLabelText('Password');

    return {
        email, 
        password, 
        ...utils
    }
}

describe('Test Sign In', () => {

    it('should display modal when nothing is entered', async () => {
        setup();
        fireEvent.click(screen.getByText('Sign In'));
        await waitFor(() => screen.getByText('Fill in all fields'));
        expect(screen.getByText('Fill in all fields')).toHaveClass('modal-body');
    });

    it('should display modal when user is not registered', async () => {
        const {email, password} = setup();
        fireEvent.change(email, {target: {value: 'reedhop@gmail.com'}});
        fireEvent.change(password, {target: {value: 'Bushums24!'}});
        fireEvent.click(screen.getByText('Sign In'));
        await waitFor(() => screen.getByText('User Not Found'));
        expect(screen.getByText('User Not Found')).toHaveClass('modal-body');
    });

    it('should display modal when user enters incorrect email', async () => {
        const {email, password} = setup();
        fireEvent.change(email, {target: {value: 'reed@ibqsystems.com'}});
        fireEvent.change(password, {target: {value: 'Bushums25!'}});
        fireEvent.click(screen.getByText('Sign In'));
        await waitFor(() => screen.getByText('Invalid Password'));
        expect(screen.getByText('Invalid Password')).toHaveClass('modal-body');
    });

});