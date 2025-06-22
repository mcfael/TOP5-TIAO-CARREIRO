import { useState } from 'react';
import apiModule from '../api/api';  // Agora você importa como default
const { api, csrfApi } = apiModule;  // Desestruturando do objeto exportado

export default function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/register', data);
    alert('Registrado com sucesso!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input placeholder="Nome" onChange={e => setData({ ...data, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
      <input type="password" placeholder="Senha" onChange={e => setData({ ...data, password: e.target.value })} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
