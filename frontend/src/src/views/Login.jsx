import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiModule from '../api/api';
import { useAuth } from '../auth/AuthContext';
import './Login.css';

const { api } = apiModule;

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validação frontend básica
    const newErrors = {};
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Por favor, insira um email válido';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/login', formData);
      
      if (response.data.token) {
        login(response.data.token, response.data.user);
        alert('Seja Bem Vindo(a) '+response.data.user.name)
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || { 
          email: ['Credenciais inválidas'] 
        });
      } else {
        setErrors({ general: 'Ocorreu um erro. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="submit-form">
        <h3>Login</h3>
        {errors.general && <p className="error">{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}