// Home.test.jsx
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home Component', () => {
  test('exibe título da seção de ranking', () => {
    render(<Home />);
    expect(screen.getByText(/ranking atual/i)).toBeInTheDocument();
  });

  test('exibe botões de paginação', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /próxima/i })).toBeInTheDocument();
  });
});
