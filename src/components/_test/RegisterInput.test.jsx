// Scenario Testing
// - RegisterInput component
//   - should handle name typing correctly
//   - should handle email typing correctly
//   - should handle password typing correctly
//   - should call submit function when register button is clicked

import matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RegisterInput from '../RegisterInput';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    // reset all mocks
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput submit={() => {}} />);
    const nameInput = await screen.findByTestId('name-input');

    // act
    await userEvent.type(nameInput, 'user 1');

    // assert
    expect(nameInput).toHaveValue('user 1');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput submit={() => {}} />);
    const emailInput = await screen.findByTestId('email-input');

    // act
    await userEvent.type(emailInput, 'email@email.com');

    // assert
    expect(emailInput).toHaveValue('email@email.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput submit={() => {}} />);
    const passwordInput = await screen.findByTestId('password-input');

    // act
    await userEvent.type(passwordInput, 'password');

    // assert
    expect(passwordInput).toHaveValue('password');
  });

  it('should call submit function when register button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput submit={mockRegister} />);
    const nameInput = await screen.findByTestId('name-input');
    await userEvent.type(nameInput, 'user 1');
    const emailInput = await screen.findByTestId('email-input');
    await userEvent.type(emailInput, 'email@email.com');
    const passwordInput = await screen.findByTestId('password-input');
    await userEvent.type(passwordInput, 'password');
    const registerButton = screen.getByRole('button', { name: 'Sign Up' });

    // act
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toHaveBeenCalled({
      name: 'user 1',
      email: 'email@email.com',
      password: 'password',
    });

  });
});
