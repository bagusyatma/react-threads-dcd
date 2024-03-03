// Scenario Testing
// - LoginInput component
//   - should handle email typing correctly
//   - should handle password typing correctly
//   - should call submit function when login button is clicked

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginInput from '../LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    // reset all mocks
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput submit={() => {}} />);
    const emailInput = await screen.findByTestId('email-input');

    // act
    await userEvent.type(emailInput, 'email@email.com');

    // assert
    expect(emailInput).toHaveValue('email@email.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput submit={() => {}} />);
    const passwordInput = await screen.findByTestId('password-input');

    // act
    await userEvent.type(passwordInput, 'password');

    // assert
    expect(passwordInput).toHaveValue('password');
  });

  it('should call submit function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput submit={mockLogin} />);
    const emailInput = await screen.findByTestId('email-input');
    await userEvent.type(emailInput, 'email@email.com');
    const passwordInput = await screen.findByTestId('password-input');
    await userEvent.type(passwordInput, 'password');
    const loginButton = screen.getByRole('button', { name: 'Sign In' });

    // act
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toHaveBeenCalled({
      email: 'email@email.com',
      password: 'password',
    });
  });
});
