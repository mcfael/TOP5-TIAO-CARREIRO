// Login.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { AuthContext } from '../auth/AuthContext';

describe('Login Component', () => {
  test('renderiza campos de email e senha e botão de entrar', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('validação de email inválido', async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: '123456' } });
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(await screen.findByText(/por favor, insira um email válido/i)).toBeInTheDocument();
  });
});
