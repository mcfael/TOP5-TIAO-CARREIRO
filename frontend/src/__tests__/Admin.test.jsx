// Admin.test.jsx
import { render, screen } from '@testing-library/react';
import Admin from '../Admin';
import { AuthContext } from '../auth/AuthContext';

describe('Admin Component', () => {
  test('mostra acesso negado quando não é admin', () => {
    render(
      <AuthContext.Provider value={{ user: { is_admin: false } }}>
        <Admin />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/acesso negado/i)).toBeInTheDocument();
  });
});
