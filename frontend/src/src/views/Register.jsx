import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiModule from '../api/api';
import './Register.css';

const { api } = apiModule;

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // Validação simples no frontend
    const newErrors = {};
    if (formData.name.length < 3) newErrors.name = 'Nome muito curto';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'Senha muito curta';
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/register', formData);
      if (response.status === 201) {
        alert('Registro realizado com sucesso!');
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Erro ao registrar. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="submit-form">
        <h3>Criar Conta</h3>
        {errors.general && <p className="error">{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
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
              placeholder="Senha (mínimo 6 caracteres)"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirme sua senha"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            {errors.password_confirmation && (
              <span className="error">{errors.password_confirmation}</span>
            )}
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Registrando...' : 'Criar Conta'}
          </button>
          <p className="login-link">
            Já tem uma conta? <a href="/login">Faça login</a>
          </p>
        </form>
      </div>
    </div>
  );
}