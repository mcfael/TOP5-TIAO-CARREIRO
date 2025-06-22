import React from 'react';
import { Link, useLocation, Navigate,useNavigate  } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './Layout.css';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { user,login,logout} = useAuth();  
  //console.log(user, login, logout);
  const navigate = useNavigate(); // Hook para navegação programática


  // Se tentar acessar /dashboard sem estar logado, redireciona para a Home
  if (pathname === '/dashboard' && !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <header className="header">
        <div className="overlay" />
        <img src="/tiao-carreiro-pardinho.png" alt="Tião Carreiro & Pardinho" className="artist-img" />
        <h1>Top 5 Músicas Mais Tocadas</h1>
        <h2>Tião Carreiro & Pardinho</h2>
        <nav>
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
          {user && (  
            <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
          )}
          {user ? (  
            <button onClick={logout} className="logout-button">Sair</button>
          ) : (
            <div className="auth-buttons">
              <button 
                onClick={() => navigate('/login')} 
                className="login-button"
              >
                Entrar
              </button>
              <button 
                onClick={() => navigate('/register')} 
                className="register-button"
              >
                Registrar
              </button>
            </div>
            
          )}
        </nav>
      </header>
      <main className="container">{children}</main>
    </>
  );
}