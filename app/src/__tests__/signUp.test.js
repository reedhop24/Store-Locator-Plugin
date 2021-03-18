import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import SignUp from '../routes/auth/signup';

const setup = () => {
    const utils = render(<SignUp/>);
    const email = utils.getByLabelText('Email');
    const password = utils.getByLabelText('Password');
    const confirm = screen.getByPlaceholderText('Confirm Password')

    return {
        email, 
        password,
        confirm,
        ...utils
    }
}

describe('Test Sign Up', () => {
    it('should display modal when nothing is entered', async () => {
        setup();
        fireEvent.click(screen.getByText('Sign Up'));
        await waitFor(() => screen.getByText('Fill in all fields'));
        expect(screen.getByText('Fill in all fields')).toHaveClass('modal-body');
    });

    it('should display modal when user enters invalid password', async () => {
        const {email, password, confirm} = setup();
        fireEvent.change(email, {target: {value: 'reedhop@gmail.com'}});
        fireEvent.change(password, {target: {value: 'Bushums24'}});
        fireEvent.change(confirm, {target: {value: 'Bushums24'}});
        fireEvent.click(screen.getByText('Sign Up'));
        await waitFor(() => screen.getByText('Password must be atleast six characters long and contain 1 uppercase character, 1 number, and 1 special character'));
        expect(screen.getByText('Password must be atleast six characters long and contain 1 uppercase character, 1 number, and 1 special character')).toHaveClass('modal-body');
    });

    it('should display modal when user already exists', async () => {
        const {email, password, confirm} = setup();
        fireEvent.change(email, {target: {value: 'reed@ibqsystems.com'}});
        fireEvent.change(password, {target: {value: 'Bushums24!'}});
        fireEvent.change(confirm, {target: {value: 'Bushums24!'}});
        fireEvent.click(screen.getByText('Sign Up'));
        await waitFor(() => screen.getByText('Email Already Registered'));
        expect(screen.getByText('Email Already Registered')).toHaveClass('modal-body');
    });

    it('should display modal when user did not enter same credentials', async () => {
        const {email, password, confirm} = setup();
        fireEvent.change(email, {target: {value: 'reed@ibqsystems.com'}});
        fireEvent.change(password, {target: {value: 'Bushums24!'}});
        fireEvent.change(confirm, {target: {value: 'Bushums24?'}});
        fireEvent.click(screen.getByText('Sign Up'));
        await waitFor(() => screen.getByText('Passwords do not match'));
        expect(screen.getByText('Passwords do not match')).toHaveClass('modal-body');
    });
});