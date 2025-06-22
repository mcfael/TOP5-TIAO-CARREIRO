// Register.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';

describe('Register Component', () => {
  test('renderiza formulário de cadastro', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha \(mínimo 6 caracteres\)/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirme sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeInTheDocument();
  });

  test('valida confirmação de senha', async () => {
    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText(/senha \(mínimo 6 caracteres\)/i), { target: { value: 'senha123' } });
    fireEvent.change(screen.getByPlaceholderText(/confirme sua senha/i), { target: { value: 'outraSenha' } });
    fireEvent.click(screen.getByRole('button', { name: /criar conta/i }));
    expect(await screen.findByText(/as senhas não coincidem/i)).toBeInTheDocument();
  });
});
