// Dashboard.test.jsx
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  test('renderiza formulário de sugestão de música', () => {
    render(<Dashboard />);
    expect(screen.getByText(/sugerir nova música/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nome da música/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/https:\/\/www\.youtube\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ex: 16\.182\.184/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar música/i })).toBeInTheDocument();
  });
});
